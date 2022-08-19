const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    ext_id:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull: true,
      }
    },
    fecha_de_lanzamiento:{
      type: DataTypes.DATEONLY,
      validate:{
        isDate: true,
      }
    },
    rating:{
      type: DataTypes.FLOAT,
      validate:{
        max:5,
        min:1,
      }
    },
    plataformas:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    genres:{
      type:DataTypes.ARRAY(DataTypes.INTEGER)
    },
    image:{
      type: DataTypes.STRING
    }
  },{
    timestamps:false
  });
};
