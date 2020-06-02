export interface CategorieType {
  nom: string;
  code: 'PROPR' | 'EXTRA';
}


export interface AddressType {
  numero: string;
  rue: string;
  code_postal: string;
  ville: string;
  adresse: string;
}

export interface AddressResponsType{
  id: string;
  numero: string;
  adresse: string;
  code_postal: string;
  ville: string;
  geolocation: string;
}

export interface TelephonType {
  phone: string;
  phonefix: string;
}
export interface coordType {
    telephone: TelephonType,
    adresstouser: AddressType
}

export interface TelephonResponsType {
  id: string;
  telephone: {phone: string};
  phonefix: string;
}

export interface CategorieCorporationType {
  id: string;
  code: 'CHR' | '' | '';
}


export interface EtablissementType {
  enseigne: string,
  corporation: string,
  phonefix: string,
  gerant:[],
  adresstoetablissement: AddressType
}

export interface EtablissementResponsType {
  id: string,
  corporation: string,
  enseigne: string,
  phonefix: string,
  gerant:[],
  numero: string,
  rue: string,
  code_postal: string,
  ville: string,
}

