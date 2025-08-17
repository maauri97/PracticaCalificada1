export const GET_ALL_COURSES = `
    SELECT co.id_course, co.coursename, ca.category, l.level, co.price
    FROM courses AS co
    LEFT JOIN categories AS ca ON ca.id_categ = co.id_categ
    LEFT JOIN levels AS l ON l.id_level = co.id_level;
`;

export const GET_COURSE_BY_ID = `
    SELECT co.id_course, co.coursename, ca.category, l.level, co.price
    FROM courses AS co
    LEFT JOIN categories AS ca ON ca.id_categ = co.id_categ
    LEFT JOIN levels AS l ON l.id_level = co.id_level
    WHERE co.id_course = ?;
`;

export const INSERT_COURSE = `
    INSERT INTO courses (coursename, id_categ, id_level, price)
    VALUES (?, ?, ?, ?);
`;

export const DELETE_COURSE = `
    DELETE FROM courses
    WHERE id_course = ?;
`;
