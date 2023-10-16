import { ResourceWithOptions } from 'adminjs'
import { Category, Course, Epsode } from '../../models'
import { categoryResourceOption } from './category'
import { courseResourceFeatures, courseResourceOptions } from './course'
import { episodeResourceFeatures, episodeResourceOptions } from './epsode'

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOption
    }, 
    {
        resource: Course,
        options: courseResourceOptions,
        features: courseResourceFeatures
    },
    {
        resource: Epsode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    }
]