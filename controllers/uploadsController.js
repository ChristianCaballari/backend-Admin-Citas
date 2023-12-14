const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { updateImg } = require("../helpers/update-img");

const fileUpload = async (req, res = response) => {

          const type = req.params.tipo;
          const id = req.params.id;

          const validTypes = ["usuarios"];

          //validamos el tipo
          if (!validTypes.includes(type)) {
          return res.status(400).json({
               ok: false,
               msg: "No es un usuario valido (tipo)",
          });
          }
          //validar que el archivo exista.
          if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).json({
               ok: false,
               msg: "No hay ningún archivo",
          });
          }
          //Procesar la imagen
          const file = req.files.imagen;
          //Extraer la extension del archivo
          const cutName = file.name.split(".");
          const extensionFile = cutName[cutName.length - 1];

          //validar extension
          const validExtensions = ["png", "jpg", "jpeg"];
          if (!validExtensions.includes(extensionFile)) {
          return res.status(400).json({
               ok: false,
               msg: "Tipo de archivo no permitido",
          });
          }
          //Genear el nombre del archivo
          const fileName = `${uuidv4()}.${extensionFile}`;
          //Crear el path para guardar la imagen
          const path = `./uploads/${type}/${fileName}`;
          //Mover la image
          file.mv(path, (err) => {
          if (err) {
               console.log(err);
               return res.status(500).json({
               ok: false,
               msg: "No se pudo guardar la imagen",
               });
          }

          //Actualizar base de datos
          updateImg(type, id, fileName);

          res.json({
               ok: true,
               msg: "Archivo subido",
               fileName,
          });
     });
};

const returnImg = (req, res = response ) =>{
     
     const tipo = req.params.tipo;
     const foto = req.params.foto;
     const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
     //imagen por defecto
     if(fs.existsSync(pathImg)){
          res.sendFile(pathImg);
     }else{
     const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
          res.sendFile(pathImg);
     }
}

module.exports = {
     fileUpload,
     returnImg
}
