/*
    Consider the following database schema and write a sql statement to calcualte MRR

    Orders
        order_id: INT, Primary Key
        order_date: TIMESTAMP

    OrderItems
        order_item_id: INT, Primary Key
        order_id: INT, Foreign Key to Orders
        product_id: INT
        quantity: INT
        price: DECIMAL

*/

WITH MonthlyRevenue AS (
    SELECT
        TO_CHAR(order_date, 'YYYY-MM') AS month,
        SUM(oi.price * oi.quantity) AS revenue
    FROM
        Orders o
    JOIN
        OrderItems oi ON o.order_id = oi.order_id
    WHERE
        o.order_date >= NOW() - INTERVAL '1 year'
    GROUP BY
        TO_CHAR(order_date, 'YYYY-MM')
    ORDER BY
        month
)

SELECT
    month,
    revenue,
    ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month) * 100, 2) AS growth_rate
FROM
    MonthlyRevenue;
