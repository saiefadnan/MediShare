CREATE OR REPLACE FUNCTION get_rating_count(input_year INT)
RETURNS TABLE(rating int, count int) AS
$$
SELECT RATING, COUNT(*)
FROM "userRating"
WHERE EXTRACT(YEAR FROM "time") = input_year
GROUP BY RATING
ORDER BY RATING;
$$ language sql;


CREATE OR REPLACE FUNCTION get_rating_chart(input_year INT)
RETURNS TABLE(month text, positive int, negative int) AS
$$
SELECT 
TO_CHAR("time", 'Mon') AS month,
COUNT(CASE WHEN rating>=3 THEN 1 END),
COUNT(CASE WHEN rating<=2 THEN 1 END)
FROM "userRating"
WHERE EXTRACT(YEAR FROM "time") = input_year
GROUP BY month, EXTRACT(MONTH FROM "time")
ORDER BY EXTRACT(MONTH FROM "time");
$$ language sql;


CREATE OR REPLACE FUNCTION get_freq_chartdata(input_year INT)
RETURNS TABLE(month text, donators int, collectors int) AS
$$
    WITH all_months AS(
    SELECT TO_CHAR(date_trunc('month', make_date(input_year,month,1)),'MON') AS month,
    date_trunc('month', make_date(input_year,month,1)) AS month_date
    FROM generate_series(1,12) AS month)
    SELECT 
        am.month,
        coalesce(sum(donation_freq), 0) as donators,
        coalesce(sum(collection_freq), 0) as collectors
    FROM all_months am
    LEFT JOIN(
        (SELECT 0 AS collection_freq, count(donor_id) as donation_freq, DATE_TRUNC('month', created_at) as month_date
        from medicine
        where extract(year from created_at) = input_year
        group by month_date)
    UNION ALL
        (SELECT count(requester_id) as collection_freq, 0 AS donation_freq, DATE_TRUNC('month', created_at) AS month_date
        from medicine_request
        where extract(year from created_at) = input_year
        group by month_date)
    ) as chartdata 
    ON am.month_date=chartdata.month_date
    group by am.month, am.month_date
    order by am.month_date;
$$ language sql;


--fetch pie data by year
CREATE OR REPLACE FUNCTION get_piedata(input_year INT)
RETURNS TABLE(pending int, success int, failure int) AS
$$
    select coalesce(sum(case when lower(mr.status)='pending' and m.expiry_date >= current_date then mr.quantity else 0 end),0) as pending,
    coalesce(sum(case when lower(mr.status)='accepted' then mr.quantity else 0 end), 0) as success,
    coalesce(sum(case when lower(mr.status)='expired' or m.expiry_date < current_date then mr.quantity else 0 end),0) as failure
    from medicine_request mr
    inner join medicine m
    on mr.med_id = m.med_id
    where extract(year from mr.created_at)=input_year;
$$ language sql;


-- top medicines data by year & limit

CREATE OR REPLACE FUNCTION get_datagrid(input_year INT, input_limit INT)
RETURNS TABLE (
  id INT,
  generic_name TEXT,
  donation NUMERIC,
  collection NUMERIC,
  pending INT
) AS 
$$
    with total_counts as(
    select
        (SELECT COALESCE(SUM(quantity),0) FROM medicine WHERE lower(status) = 'available' and extract(year from created_at)=input_year) as total_available,
        (SELECT COALESCE(SUM(quantity),0) FROM medicine_request WHERE lower(status) = 'accepted' and extract(year from created_at)=input_year) as total_accepted
    ),
    computed_data as (
      select upper(generic_name) as generic_name, 
      case
      when tc.total_available=0 then 0
      else round(COALESCE(SUM(case when lower(m.status)='available' then m.quantity end),0)*100.00/tc.total_available, 2)
      end AS donation,
      case
      when tc.total_accepted=0 then 0
      else round(COALESCE(SUM(case when lower(mr.status)='accepted' then mr.quantity end),0)*100.00/tc.total_accepted, 2)
      end AS Collection, 
      COALESCE(SUM(case when lower(mr.status)='pending' then mr.quantity end),0) AS pending
      from medicine m 
      join medicine_request mr on m.med_id=mr.med_id
      join total_counts tc on true
      where extract(year from m.created_at)=input_year
      and extract(year from mr.created_at)>=input_year
      group by generic_name, tc.total_available, tc.total_accepted
      having COALESCE(SUM(case when lower(mr.status)='pending' then mr.quantity end),0)>0
    )
    select 
        ROW_NUMBER() OVER (ORDER BY pending DESC) AS id,
        generic_name, 
        donation,
        collection,
        pending
    from computed_data
    order by pending desc
    limit input_limit;
$$ language sql;


CREATE OR REPLACE FUNCTION get_donation_piedata(input_year INT)
RETURNS TABLE(donation int, expired int, others int) AS
$$
    select coalesce(sum(case when lower(m.status)='available' and m.expiry_date >= current_date then m.quantity else 0 end),0) as donation,
    coalesce(sum(case when m.expiry_date < current_date then m.quantity else 0 end),0) as expired,
    coalesce(sum(case when lower(m.status)!='available' and and m.expiry_date >= current_date then m.quantity else 0 end), 0) as others
    from medicine m
    where extract(year from m.created_at)=input_year;
$$ language sql;


CREATE OR REPLACE FUNCTION get_collection_piedata(input_year INT)
RETURNS TABLE(collection int, pending int, others int) AS
$$
    select coalesce(sum(case when lower(mr.status)='accepted' then mr.quantity else 0 end),0) as collection,
    coalesce(sum(case when lower(mr.status)='pending' then mr.quantity else 0 end),0) as pending,
    coalesce(sum(case when lower(mr.status)!='accepted' and lower(mr.status)!='pending' then mr.quantity else 0 end), 0) as others
    from medicine_request mr
    where extract(year from mr.created_at)=input_year;
$$ language sql;


CREATE OR REPLACE FUNCTION get_weekly_comparison_data()
RETURNS TABLE(day varchar, donation int, collection int) AS
$$
SELECT 
  to_char(current_date-i, 'Day') as day,
  coalesce(sum(case when lower(m.status) = 'available' and m.expiry_date >= current_date then m.quantity else 0 end), 0) AS donation,
  coalesce(sum(case when lower(mr.status) = 'accepted' then mr.quantity else 0 end), 0) AS collection
FROM 
  generate_series(0,6) as s(i) 
  left join medicine m
  on DATE(current_date-s.i)=DATE(m.created_at)
  and m.created_at >= NOW() - INTERVAL '6 days'
  left join medicine_request mr
  on DATE(current_date-s.i)=DATE(mr.created_at)
  and mr.created_at >= NOW() - INTERVAL '6 days'
GROUP BY s.i
order by s.i;
$$ language sql;

CREATE OR REPLACE FUNCTION get_user_data()
RETURNS TABLE(id int, username text, email text,image_url text,status text,donation_contribution numeric,collection_contribution numeric) AS
$$
    with total_contribution as(
    select
        (SELECT COALESCE(SUM(quantity),0) FROM medicine WHERE lower(status) = 'available') as don_cont,
        (SELECT COALESCE(SUM(quantity),0) FROM medicine_request WHERE lower(status) = 'accepted') as col_cont
    )

    SELECT u.id, u.username, email, image_url, lower(u.status),
    case
    when tc.don_cont=0 then 0
    else round(COALESCE(SUM(case when lower(m.status)='available' then m.quantity end),0)*100.00/tc.don_cont, 2)
    end AS donation_contribution,
    case
    when tc.col_cont=0 then 0
    else round(COALESCE(SUM(case when lower(mr.status)='accepted' then m.quantity end),0)*100.00/tc.col_cont, 2)
    end AS collection_contribution
    FROM "userInfo" u
    left join medicine m
    on u.id=m.donor_id
    left join medicine_request mr 
    on mr.med_id=m.med_id
    join total_contribution tc on true
    where role='user'
    GROUP BY u.id, u.username, u.email, u.image_url, u.status, tc.don_cont, tc.col_cont
    ORDER BY donation_contribution DESC, collection_contribution ASC;
$$ language sql;
