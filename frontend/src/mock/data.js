export const mockFlats = [
  {_id:'f1', number:'A-101', size:'2BHK', floor:1, occupied:true},
  {_id:'f2', number:'A-102', size:'1BHK', floor:1, occupied:false},
  {_id:'f3', number:'B-201', size:'3BHK', floor:2, occupied:true},
  {_id:'f4', number:'B-202', size:'Studio', floor:2, occupied:false},
  {_id:'f5', number:'C-301', size:'2BHK', floor:3, occupied:true},
  {_id:'f6', number:'C-302', size:'2BHK', floor:3, occupied:false},
];
export const mockRequests = [
  {_id:'m1', title:'Leaky faucet', description:'Kitchen tap leaking steadily', priority:'Low', status:'Pending', flat:{_id:'f1', number:'A-101'}},
  {_id:'m2', title:'AC not cooling', description:'AC unit not cooling in bedroom', priority:'High', status:'In Progress', flat:{_id:'f3', number:'B-201'}},
  {_id:'m3', title:'Broken window', description:'Living room window cracked', priority:'Medium', status:'Pending', flat:{_id:'f2', number:'A-102'}},
  {_id:'m4', title:'Elevator issue', description:'Elevator stops at 2nd randomly', priority:'High', status:'Resolved', flat:null},
  {_id:'m5', title:'Pest control', description:'Request for pest control on 3rd floor', priority:'Medium', status:'Pending', flat:{_id:'f6', number:'C-302'}},
];
export const mockUser = { _id:'u1', name:'Alex Resident', email:'alex@example.com' };
