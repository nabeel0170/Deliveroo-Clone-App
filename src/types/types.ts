import {
  ImageSourcePropType,
  SectionList,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import * as Yup from 'yup';
import {Control} from 'react-hook-form';
import {StackNavigationProp} from '@react-navigation/stack';
import {RefObject} from 'react';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type authStates = 'email' | 'login' | 'signup' | 'loggedIn' | '';

export type AuthFormNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;
export interface headerProps {
  screen: string;
  setModalVisible?: (value: boolean) => void;
}
export interface buttonProps {
  buttonText?: string;
  onPress?: () => void;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textStyle?: TextStyle;
  iconColor?: string;
}

export interface InfoCardProps {
  onPress?: () => void;
  icon?: string;
  iconColor?: string;
  text: string;
  text2: string;
  textStyle?: TextStyle;
  text2Style?: TextStyle;
}
export interface iconButtonProps {
  onPress?: () => void;
  icon: string;
  style?: StyleProp<ViewStyle>;
}

export interface FooterSectionProps {
  title: string;
  listItem?: string[];
  image?: ImageSourcePropType[];
}

export interface MenuItemProps {
  title: string;
  description: string;
  price: number;
  imageUrl: ImageSourcePropType;
  calories: number;
}
export interface TextInputFieldProps extends TextInputProps {
  // eslint-disable-next-line
  control?: Control<any>;
  label?: string;
  placeholder?: string;
  isSensitive?: boolean;
  // eslint-disable-next-line
  error?: string | {message: string} | any;
  name: keyof FormData;
}
export interface CategoriesNavProps {
  categories: {id: number; name: string}[];
  sectionRefs: RefObject<SectionList>;
}

export interface FormData {
  email: string;
  password: string;
  repeatedPassword?: string;
  contactNumber?: number;
  fullName?: string;
}
export interface LoginFormData {
  email: string;
  encryptedPassword: string;
}
export interface FormProps<T> {
  validationSchema?: Yup.AnyObjectSchema;
  submitHandler: (data: T) => void;
  children?: React.ReactNode;
  formErrors?: Record<string, string>;
}
export interface userStateProps {
  isLoggedIn: boolean;
  name: string | undefined;
  token: string | null;
  expiry: number | null;
  authenticationState: authStates;
  isLoading: boolean;
  requestError: string | null;
  responseError: string | null;
}
export interface fetchDataParams {
  url: string;
  method: HttpMethod;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

export interface ApiError {
  response?: {
    // eslint-disable-next-line
    data: any;
  };
  message?: string;
}

export type AuthStackParamList = {
  Login: undefined;
  Menu: undefined;
};

export interface FoodItem {
  category: category;
  image: string;
  name: string;
  calories: number | null;
  price: number | null;
  description: string;
}

export type FoodItems = FoodItem[];
export interface PopularItemsProps {
  menuItems: FoodItem[];
}
export interface MenuState {
  items: FoodItems;
  loading: boolean;
  categories: categories;
  error: string | null;
}

interface category {
  name: string;
  id: number;
}
export type categories = category[];
export interface ItemSectionProps {
  categories: categories;
  // eslint-disable-next-line
  // sectionRefs: React.Ref<SectionList<any, {title: string; data: any[]}>>;
}

export interface PopularFoodCardProps {
  imageURL: ImageSourcePropType;
  name: string;
  calories: number;
  price: number;
}

export interface ErrorResponse {
  message: string;
}

export interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  children?: React.ReactNode;
}
export interface SearchModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  children?: React.ReactNode;
}
export interface SearchInputProps {
  setModalVisible: (value: boolean) => void;
  setItems: (items: FoodItems) => void;
}
