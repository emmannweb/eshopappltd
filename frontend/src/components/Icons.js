import * as Icons from "@mui/icons-material";

const IconMui = ({ iconName, ...props }) => {
  const IconComponent = Icons[iconName];

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null;
  }
  return <IconComponent {...props} />;
};

export default IconMui;
