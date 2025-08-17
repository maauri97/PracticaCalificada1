export const GET_ALL_PURCHASES = `
  SELECT 
    p.id_purchase,
    p.datetime_purchase,

    u.id_user,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    u.email,

    c.id_course,
    c.coursename,
    c.price,

    d.id_discount,
    d.discount_pct,
    ROUND(c.price * (1 - d.discount_pct), 2) AS precio_final

  FROM purchases AS p
  LEFT JOIN users AS u ON u.id_user = p.id_user
  LEFT JOIN courses AS c ON c.id_course = p.id_course
  LEFT JOIN discounts AS d ON d.id_discount = p.id_discount
  ORDER BY p.datetime_purchase DESC;
`;

export const GET_PURCHASE_BY_ID = ``;

export const INSERT_PURCHASE = ``;

export const DELETE_PURCHASE = ``;
