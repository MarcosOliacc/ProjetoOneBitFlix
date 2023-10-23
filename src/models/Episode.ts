import { Model, Optional, DataTypes } from 'sequelize'
import { sequlize } from '../database'
import { WatchTimeInstance } from './WatchTime'

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
export interface EpisodeInstance extends Model<Episode, EpsodeCreateAttributes>, Episode {
  watchTime?: WatchTimeInstance
}

export const Episode = sequlize.define<EpisodeInstance, Episode>('Episodes', {
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