import { Category } from "./Category"
import { Course } from "./Course"
import { Episode } from "./Episode"
import { User } from "./User"
import { Favorite } from "./Favorite"
import { Like } from "./Like"
import { WatchTime } from "./WatchTime"

Category.hasMany(Course, { as: 'courses' })

Course.belongsTo(Category)
Course.hasMany(Episode, { as: 'episodes'})
Course.belongsToMany(User, { through: Favorite })
Course.belongsToMany(User, { through: Like })
Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id'})

User.belongsToMany(Course, { through: Favorite })
User.belongsToMany(Course, { through: Like })
User.belongsToMany(Episode, { through: WatchTime})
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id'})


Favorite.belongsTo(Course)
Favorite.belongsTo(User)

Episode.belongsTo(Course)
Episode.belongsToMany(User, { through: WatchTime })
export {
    Category,
    Course,
    Episode,
    User,
    Like,
    Favorite,
    WatchTime
}