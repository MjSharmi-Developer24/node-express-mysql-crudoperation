const mysql =  require("mysql");


const con = mysql.createPool({
    host     :  process.env.DB_HOST,
    user     :  process.env.DB_USER,
    password :  process.env.DB_PASS,
    database :  process.env.DB_NAME
    
});

exports.view = (req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from data",(err,rows)=>{
            connection.release();
            if(!err){
                console.log("success");
                res.render("home",{rows});
            }else{
                console.log("error in listening data"+err)
            }
        })
        
    })
    
}

exports.adduser = (req,res)=>{
    res.render("adduser");
}

exports.save = (req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,age,city}=req.body;
        connection.query("insert into data (name,age,city) values (?,?,?)", [name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"user details added successfully"});
            } else{
                console.log("error listing data " + err);
            }
        });
    });
}

//edit

exports.edituser = (req,res)=>{
    res.render("edituser");
}


exports.edituser = (req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id = req.params.id;
        connection.query("select * from data where id = ?",[id],(err,rows)=>{
        connection.release();
         if(!err){
            res.render("edituser",{rows});
         }else{
              console.log("error listening in db"+ err)
         }
        });
    });
   
};


exports.edit = (req,res) => {
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,age,city} = req.body;
        let id = req.params.id;
        connection.query("update data set name=?, age=?, city=? where id=?",[name,age,city,id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render("edituser",{msg:"user detail updated success"});
            }else{
                console.log("error in listing data "+ err);
            }
        });
    });
}

//delete
exports.deleteuser = (req,res)=>{
        con.getConnection((err,connection)=>{
            if(err) throw err
            let id = req.params.id;
            connection.query("delete from data where id=?",[id], (err,rows)=>{
                connection.release();
                if(!err){
                    // res.render("deleteuser",{msg:"user detail deleted success"});
                res.redirect("/");
                }else{
                    console.log("error in listing data "+ err);
                }
            });
        });
    }

