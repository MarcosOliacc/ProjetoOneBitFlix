import { Category } from "./Category"
import { Course } from "./Course"
import { Epsode } from "./Episode"

Category.hasMany(Course)
Course.belongsTo(Category)
Course.hasMany(Epsode)
Epsode.belongsTo(Course)

export {
    Category,
    Course,
    Epsode
}