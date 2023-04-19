import React, {useState, useEffect} from 'react';
import {db} from '../firebase';
import { addDoc, doc, collection, onSnapshot, deleteDoc, updateDoc, } from 'firebase/firestore';

const Formulario = () => {
    const [TipoMaterial, setTipoMaterial] = useState('');
    const [Moneda, setMoneda] = useState(0);
    const [Dije, setDije] = useState('');
    const [Tipo, setTipo] = useState('');
    const [Valor, setValor] = useState(0);
    const [Cantidad, setCantidad] = useState('');
    const [ValorTotal, setValorTotal] = useState('');

    useEffect( ()=>{
        const validarSelec =  ()=>{
            if(TipoMaterial && Dije &&Tipo && Moneda){
                if((TipoMaterial==='Cuero'&& Dije==='Ancla' && Tipo==='Niquel')||(TipoMaterial==='Cuerda'&& Dije==='Martillo' && (Tipo==='Oro'|| Tipo==='Oro Rosado'))||(TipoMaterial==='Cuerda'&& Dije==='Ancla' && Tipo==='Plata')){
                    Moneda==='Dolares'? setValor(90):setValor(404100) ;
                }else if((TipoMaterial==='Cuero'&& Dije==='Martillo' && Tipo==='Plata')||(TipoMaterial==='Cuerda'&& Dije==='Ancla' && Tipo==='Niquel')){
                    Moneda==='Dolares'? setValor(80):setValor(359100) ;
                }else if((TipoMaterial==='Cuero'&& Dije==='Martillo' && (Tipo==='Oro'|| Tipo==='Oro Rosado'))||(TipoMaterial==='Cuero'&& Dije==='Ancla' && Tipo==='Plata')){
                    Moneda==='Dolares'? setValor(100):setValor(449000) ;
                }else if((TipoMaterial==='Cuero'&& Dije==='Martillo' && Tipo==='Niquel')||(TipoMaterial==='Cuerda'&& Dije==='Martillo' && Tipo==='Plata')){
                    Moneda==='Dolares'? setValor(70):setValor(315000) ;
                }else if(TipoMaterial==='Cuerda'&& Dije==='Martillo' && Tipo==='Niquel'){
                    Moneda==='Dolares'? setValor(50):setValor(224500) ;
                }else if(TipoMaterial==='Cuero'&& Dije==='Ancla' && (Tipo==='Oro'||Tipo==='Oro Rosado')){
                    Moneda==='Dolares'? setValor(120):setValor(539000) ;
                }else if(TipoMaterial==='Cuerda'&& Dije==='Ancla' && (Tipo==='Oro'||Tipo==='Oro Rosado')){
                    Moneda==='Dolares'? setValor(110):setValor(494000) ;
                }else{
                    setValor(0)
                }
            }
        }
        validarSelec();
    },[TipoMaterial, Dije, Tipo, Moneda])
    
    const guardar = async(e)=>{
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'pedido'),{
                Moneda: Moneda,
                TipoMaterial: TipoMaterial,
                Dije: Dije,
                Tipo: Tipo,
                Valor: Valor,
                ValorTotal: ValorTotal
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="container mt-5">
        <h1 className="text-center">Formulario</h1>
        <hr/>
        <div className="row">
            <div className="col-6">
                <h4 className="text-center">Selecciona tus manillas</h4>
                <form onSubmit={guardar}> 
                <select value={Moneda} onChange={(e)=>setMoneda(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione el tipo de moneda</option>
                        <option value="Pesos Colombianos">Pesos Colombianos</option>
                        <option value="Dolares">Dolares</option>
                    </select>
                    <select value={TipoMaterial} onChange={(e)=>setTipoMaterial(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione el tipo de Material</option>
                        <option value="Cuero">Cuero</option>
                        <option value="Cuerda">Cuerda</option>
                    </select>
                    <select value={Dije} onChange={(e)=>setDije(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione Dije</option>
                        <option value="Martillo">Martillo</option>
                        <option value="Ancla">Ancla</option>
                    </select><select value={Tipo} onChange={(e)=>setTipo(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione el tipo de Joya</option>
                        <option value="Oro">Oro</option>
                        <option value="Oro Rosado">Oro Rosado</option>
                        <option value="Plata">Plata</option>
                        <option value="Niquel">Niquel</option>
                    </select>
                    <label className='label mb-4' htmlFor="">Valor unitario</label>
                    <input className='form-control mb-4' type="text" value={'$'+Valor} disabled />
                    <input className='form-control mb-4' type="number" min={0} placeholder='cantidad' />
                    <div className='pb-4'>
                        <button className='btn btn-primary btn-block'>Agregar</button>
                        <input type="reset" className='btn btn-warning btn-block mx-2' value='Cancelar' />
                    </div>
                </form>
            </div>
            <div className="col-6" >
                <h4 className="text-center" >Carrito de compras</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
};

 export default Formulario;
