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
GROUP BY month;
$$ language sql;