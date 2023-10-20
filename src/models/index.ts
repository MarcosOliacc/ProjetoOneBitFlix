import { Category } from "./Category"
import { Course } from "./Course"
import { Episode } from "./Episode"
import { User } from "./User"
import { Favorite, Favotire } from "./Favorite"

Category.hasMany(Course, { as: 'courses' })

Course.belongsTo(Category)
Course.hasMany(Episode, { as: 'episodes'})
Course.belongsToMany(User, { through: Favotire })
Course.hasMany(Favotire, { as: 'FavoritesUsers', foreignKey: 'course_id'})

User.belongsToMany(Course, { through: Favotire })
User.hasMany(Favotire, { as: 'FavoritesCourses', foreignKey: 'user_id'})

Favotire.belongsTo(Course)
Favotire.belongsTo(User)

Episode.belongsTo(Course)
export {
    Category,
    Course,
    Episode,
    User,
    Favorite
}