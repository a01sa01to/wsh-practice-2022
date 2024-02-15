declare module "*.jpg" {
  export default any;
}
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
