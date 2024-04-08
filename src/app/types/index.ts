export interface UserProfileCardProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  imageSrc?: string;
}

export interface RoleTabProps {
  tabName: string;
  description?: string;
  children: React.JSX.Element;
}

export interface DialogBoxProps {
    roleName:string;
    firstName:string;
    lastName:string;
    email:string;
    role:string
}
export type ButtonProps = {
  type?: "submit" | "reset" | "button";
  name: string;
  onClick?: () => void;
  sx?:string
};