import { Model, Optional, DataTypes } from 'sequelize'
import { sequlize } from '../database'

export interface Episode {
    id: number,
    name: string,
    synopsis: string,
    order: boolean,
    videoUrl: string,
    secondsLong: number,
    courseId: number
}

export interface EpsodeCreateAttributes extends Optional<Episode, 'videoUrl' | 'secondsLong'>{}
export interface EpisodeInstance extends Model<Episode, EpsodeCreateAttributes>, Episode {}

export const Epsode = sequlize.define<EpisodeInstance, Episode>('episodes', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      synopsis: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      order: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      videoUrl: {
        type: DataTypes.STRING
      },
      secondsLong: {
        type: DataTypes.INTEGER
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },    
})