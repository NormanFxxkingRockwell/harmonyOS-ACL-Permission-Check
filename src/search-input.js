// Keep the composing input mounted; update only the results after a committed value.
export function bindSearchInputs(root,handlers) {
 const composing=new Set();
 root.addEventListener('compositionstart',event=>{
  if(handlers[event.target.id])composing.add(event.target.id);
 });
 root.addEventListener('compositionend',event=>{
  const id=event.target.id;
  composing.delete(id);
  handlers[id]?.(event.target.value);
 });
 root.addEventListener('input',event=>{
  const id=event.target.id;
  if(!event.isComposing&&!composing.has(id))handlers[id]?.(event.target.value);
 });
}
