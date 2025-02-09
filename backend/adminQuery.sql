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