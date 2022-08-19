const {DataTypes}= require ('sequelize')


module.exports=(sequelize)=>{
    sequelize.define('Genre',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true
        }

    },{
        timestamps:false
    })
}