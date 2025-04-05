"use client"

import axios from 'axios'
import { useEffect, useState } from 'react'

interface Tarefa {
    id: number
    title: string
    completed: boolean
}

export default function ListaTarefa() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([])
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        axios.get("https://jsonplaceholder.typicode.com/todos/")
            .then(function (resposta) {
                setTarefas(resposta.data)
                setCarregando(false)
            })
            .catch(function () {
                setCarregando(false)

            })

    }, [])
    function deletarTarefa(id: number) {
        axios.delete("https://jsonplaceholder.typicode.com/todos/" + id)
            .then(function () {
                alert("Tarefa deletada com sucesso")

                const novasTarefas = tarefas.filter(function (dados) {
                    return dados.id !== id
                })

                setTarefas(novasTarefas)
            })
            .catch(function () {
                alert("Erro ao deletar")
            })
    }
    return (
        <>
            <ul>
                {tarefas.length > 0 ? tarefas.map(function (tarefa) {
                    return (
                        <li key={tarefa.id}>
                            {tarefa.title}

                            <button onClick={function () {
                                deletarTarefa(tarefa.id)
                            }}>DELETAR
                            </button>
                        </li>

                    )
                }) : <h1>Loading...</h1>
                }
            </ul>
        </>
    )
}



