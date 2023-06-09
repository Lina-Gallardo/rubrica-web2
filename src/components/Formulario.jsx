import React, {useState, useEffect} from 'react';
import {db} from '../firebase';
import { addDoc, doc, collection, onSnapshot, deleteDoc, updateDoc, } from 'firebase/firestore';

const Formulario = () => {
    const [TipoMaterial, setTipoMaterial] = useState('');
    const [Moneda, setMoneda] = useState('');
    const [Dije, setDije] = useState('');
    const [TipoJoya, setTipoJoya] = useState('');
    const [Valor, setValor] = useState(0);
    const [Cantidad, setCantidad] = useState('');
    const [ValorTotal, setValorTotal] = useState(0);
    const [ListaPedido, setListaPedido] = useState([]);
    const [id, setId] = useState('');
    const [ModoEdision, setModoEdision] = useState(false);
    useEffect( ()=>{
        const validarSelec =  ()=>{
            var Peso = 5000;
            var Dolar = 1;
            if(TipoMaterial && Dije &&TipoJoya && Moneda){
                if((TipoMaterial==='Cuero'&& Dije==='Ancla' && TipoJoya==='Niquel')||(TipoMaterial==='Cuerda'&& Dije==='Martillo' && (TipoJoya==='Oro'|| TipoJoya==='Oro Rosado'))||(TipoMaterial==='Cuerda'&& Dije==='Ancla' && TipoJoya==='Plata')){
                    // setDolar(90);
                    Dolar=90;
                    setValor(Moneda==='Dolares'? Dolar:(Dolar*Peso));
                }else if((TipoMaterial==='Cuero'&& Dije==='Martillo' && TipoJoya==='Plata')||(TipoMaterial==='Cuerda'&& Dije==='Ancla' && TipoJoya==='Niquel')){
                    // setDolar(80);
                    Dolar=80;
                    setValor(Moneda==='Dolares'?Dolar:(Dolar*Peso)) ;
                }else if((TipoMaterial==='Cuero'&& Dije==='Martillo' && (TipoJoya==='Oro'|| TipoJoya==='Oro Rosado'))||(TipoMaterial==='Cuero'&& Dije==='Ancla' && TipoJoya==='Plata')){
                    // setDolar(100);
                    Dolar=100;
                    setValor(Moneda==='Dolares'?Dolar:(Dolar*Peso)) ;
                }else if((TipoMaterial==='Cuero'&& Dije==='Martillo' && TipoJoya==='Niquel')||(TipoMaterial==='Cuerda'&& Dije==='Martillo' && TipoJoya==='Plata')){
                    // setDolar(70);
                    Dolar=70;
                    setValor(Moneda==='Dolares'?Dolar:(Dolar*Peso)) ;
                }else if(TipoMaterial==='Cuerda'&& Dije==='Martillo' && TipoJoya==='Niquel'){
                    // setDolar(50);
                    Dolar=50;
                    setValor(Moneda==='Dolares'?Dolar:(Dolar*Peso)) ;
                }else if(TipoMaterial==='Cuero'&& Dije==='Ancla' && (TipoJoya==='Oro'||TipoJoya==='Oro Rosado')){
                    // setDolar(120);
                    Dolar=120;
                    setValor(Moneda==='Dolares'?Dolar:(Dolar*Peso)) ;
                }else if(TipoMaterial==='Cuerda'&& Dije==='Ancla' && (TipoJoya==='Oro'||TipoJoya==='Oro Rosado')){
                    // setDolar(110);
                    Dolar=110;
                    setValor(Moneda==='Dolares'?Dolar:(Dolar*Peso)) ;
                }else{
                    setValor(0)
                }
            }
            if(Valor && Cantidad){
                setValorTotal(Valor*Cantidad);
            }
        }
        validarSelec();
    },[TipoMaterial, Dije, TipoJoya, Moneda, Cantidad, Valor])
    
    useEffect(()=>{
        const obtenerPedido = async ()=>{
            try {
                await onSnapshot(collection(db, 'pedido'), (query)=>{
                    setListaPedido(query.docs.map((doc)=>({...doc.data(), id: doc.id})));
                })
            } catch (error) {
                console.log(error);
            }    
        }
        obtenerPedido();
    }, [])

    const limpiar = ()=>{
        setTipoMaterial('')
        setTipoJoya('')
        setMoneda('')
        setDije('')
        setValorTotal(0)
        setValor(0)
        setCantidad('')
    }

    const eliminar = async id=>{
        try {
            await deleteDoc(doc(db, 'pedido', id))
        } catch (error) {
            console.log(error)
        }
    }    

    const guardar = async(e)=>{
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'pedido'),{
                Moneda: Moneda,
                TipoMaterial: TipoMaterial,
                Dije: Dije,
                TipoJoya: TipoJoya,
                Valor: Valor,
                Cantidad: Cantidad,
                ValorTotal: ValorTotal
            })
            setListaPedido(
                [...ListaPedido,{
                    Moneda: Moneda,
                    TipoMaterial: TipoMaterial,
                    Dije: Dije,
                    TipoJoya: TipoJoya,
                    Valor: Valor,
                    Cantidad: Cantidad,
                    ValorTotal: ValorTotal
                }]
            )
            limpiar()
        } catch (error) {
            console.log(error)
        }
    }

    const editarPedido = async e=>{
        e.preventDefault();
        try {
            const docRef = doc(db, 'pedido', id);
            await updateDoc(docRef,{
                Moneda: Moneda,
                TipoMaterial: TipoMaterial,
                Dije: Dije,
                TipoJoya: TipoJoya,
                Valor: Valor,
                Cantidad: Cantidad,
                ValorTotal: ValorTotal
            })
            const nuevoArray = ListaPedido.map(
                item=>item.id === id? {id:id, Moneda: Moneda, TipoMaterial: TipoMaterial, Dije: Dije, TipoJoya: TipoJoya, Valor: Valor, Cantidad: Cantidad, ValorTotal: ValorTotal}:item
            )
            setListaPedido(nuevoArray)
            limpiar()
            setModoEdision(false)
        } catch (error) {
            console.log(error);
        }
    }

    const editar = item =>{
        setMoneda(item.Moneda)
        setTipoMaterial(item.TipoMaterial)
        setDije(item.Dije)
        setTipoJoya(item.TipoJoya)
        setValor(item.Valor)
        setCantidad(item.Cantidad)
        setValorTotal(item.ValorTotal)
        setId(item.id)
        setModoEdision(true)
    }

    const cancelar = ()=>{
        setModoEdision(false)
        limpiar()
    }

  return (
    <div className="container mt-5">
        <h1 className="text-center">Formulario</h1>
        <hr/>
        <div className="row">
            <div className="col-6">
                <h4 className="text-center">{ModoEdision?'Modificar Pedido':'Arma tu Pedido'}</h4>
                <form onSubmit={ModoEdision? editarPedido:guardar}> 
                    <select required value={Moneda} onChange={(e)=>setMoneda(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione el tipo de moneda</option>
                        <option value="Pesos Colombianos">Pesos Colombianos</option>
                        <option value="Dolares">Dolares</option>
                    </select>
                    <select required value={TipoMaterial} onChange={(e)=>setTipoMaterial(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione el tipo de Material</option>
                        <option value="Cuero">Cuero</option>
                        <option value="Cuerda">Cuerda</option>
                    </select>
                    <select required value={Dije} onChange={(e)=>setDije(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione Dije</option>
                        <option value="Martillo">Martillo</option>
                        <option value="Ancla">Ancla</option>
                    </select>
                    <select required value={TipoJoya} onChange={(e)=>setTipoJoya(e.target.value)} className="form-select mb-4" name="Document" id=''>
                        <option defaultChecked>Seleccione el tipo de Joya</option>
                        <option value="Oro">Oro</option>
                        <option value="Oro Rosado">Oro Rosado</option>
                        <option value="Plata">Plata</option>
                        <option value="Niquel">Niquel</option>
                    </select>
                    <label className='label mb-4' htmlFor="">Valor unitario</label>
                    <input required className='form-control mb-4' type="number" value={Valor} disabled />
                    <label className='label mb-4' htmlFor="">Cantidad</label>
                    <input required className='form-control mb-4' type="number" value={Cantidad} onChange={(e)=>setCantidad(e.target.value)} min={1} placeholder='cantidad' />
                    <label className='label mb-4' htmlFor="">Valor Total</label>
                    <input required className='form-control mb-4' type="number" value={ValorTotal} disabled />
                    <div className='pb-4'>
                        {
                            ModoEdision?
                            (
                                <>
                                    <button className='btn btn-success btn-block mx-2'>Actualizar</button>
                                    <button className='btn btn-danger btn-block' onClick={()=>cancelar()}>Cancelar</button>
                                </>
                            ):
                            (
                                <>
                                    <button className='btn btn-primary btn-block'>Agregar</button>
                                    <button className='btn btn-danger btn-block mx-2' onClick={()=>limpiar()}> Cancelar</button>
                                </>
                            )
                        }
                    </div>
                </form>
            </div>
            <div className="col-6" >
                <h4 className="text-center" >Carrito de compras</h4>
                <ul className="list-group">
                    {   
                        ListaPedido.map(item=>(                          
                            <li className='list-group-item' key={item.id}>
                                <p className='lead'> Manilla de {item.TipoMaterial} con dije de {item.TipoJoya} en forma de {item.Dije} cantidad: {item.Cantidad} valor por unidad {item.Valor} </p>
                                <p className='lead'> Valor total: {item.ValorTotal} {item.Moneda} </p>
                                <p className='lead'> El total en {item.Moneda==='Dolares'?'Pesos Colombianos':'Dolares'} es: {item.Moneda==='Dolares'?item.ValorTotal*5000:item.ValorTotal/5000} </p>
                                <button className='btn btn-warning btn-sn fload-end mx-2' onClick={()=>editar(item)}>Editar</button>
                                <button className='btn btn-danger btn-sn fload-end mx-2' onClick={()=>eliminar(item.id)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
};

 export default Formulario;
