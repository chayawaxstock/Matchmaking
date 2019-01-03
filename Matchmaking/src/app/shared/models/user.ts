import { City } from './city';
import { Status } from './status';
import { Community } from './community';
import { Hassid } from './hassid';
import { Recommend } from './recommend';
import { BodyStructure } from './bodyStructure';
import { Work } from './work';
import { Preference } from './preference';
import { SpiritualState } from './spiritualState';
import { Recomends } from './recomends';

export class User{

    id:number;
    userName:string;
    password:string;
    email:string;
    tz:string;
    phone:string;
    tel:string;
    imageUrl:string;
    city:City;
    firstName:string;
    lastName:string;
    address:string;
    brithday:Date;
    age:number;
    gender:number;
    isAdmin:boolean;
    numChildren:number;
    status:Status;//מצב משפחתי
    isChildrenInHisCare:boolean;//ילדים בהחזקתו
    community1:Community;//עדה
    community2:Community;
    hassidoot:Hassid;
    recomends:Recomends;//ממליצים
    bodyStructure:BodyStructure;
    spiritualState:SpiritualState;//מצב רוחני
    work:Work;//עבודה
    dateCreate:Date;
    preference:Preference;//העדפות
    personaStar:number;//אשיות בכוכבים
}