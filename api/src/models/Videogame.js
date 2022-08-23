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
    name: {
      type: DataTypes.STRING(100),
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
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    image:{
      type: DataTypes.STRING,
      defaultValue:"https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

    }
  },{
    timestamps:false
  });
};
