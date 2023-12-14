
const getMenuFronEnd = (role = 'USER_ROLE') => {

     const menu = [
       { 
         titulo:'Matenimiento',
         icono: 'mdi mdi-folder-lock-open',
         submenu: [
            { titulo: 'Citas',url:'citas'},
         ]
       }, 
     ];
  
     if(role ==='ADMIN_ROLE'){
       menu[0].submenu.unshift({titulo:'Usuarios',url:'usuarios'})
     }
     return menu;
  }
  
  module.exports= {
       getMenuFronEnd
  }