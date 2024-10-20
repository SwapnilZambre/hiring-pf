export const roles={
Menus:[
  {
  path:'dashboard',
  text:'Dashboard',
  roles:['Admin','Account','Manager','Support','Recruiter']
},
{
  path:'user-list',
  text:'User List',
  roles:['Admin','Account']
},
{
  path:'products',
  text:'Product',
  roles:['Admin','Recruiter']
}
]
}

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}