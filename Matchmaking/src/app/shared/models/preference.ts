import { Community } from './community';
import { Hassid } from './hassid';
import { Color } from './color';
import { Status } from './status';

export class Preference
{
    id:number;
    fromAge:number;
    tillAge:number;
    communities:Community[]=[];
    hassidoots:Hassid[]=[];
    skinColor:Color;
    statuses:Status[]=[];
    healthCondition:boolean;
    spiritualStateInt:number;
    isDrivingLicense:boolean;
    isComputer:boolean;
    isSmoking:boolean;
    isInternet:boolean;
    economicSituation:number;//מצב כלכלי
}