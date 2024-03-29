import { DragEventHandler, useCallback } from 'react'
import { Chord } from '@tonaljs/chord'
import { format } from '../const/dataTransfer'
import { nodeTypeNames } from '../const/nodeTypes'
import { ChordNodeData } from '../type/NodeData'

function useDrag() {
  const createDragChordNodeStartFnc = (chordName: Chord['symbol'], key: string): DragEventHandler<HTMLDivElement> => {
    return (e) => onDragChordNodeStart(e, chordName, key)
  }
  const onDragChordNodeStart = (event: React.DragEvent, chordName: Chord['symbol'], key: string) => {
    const chordNodeData: ChordNodeData = { chordName: chordName, key: 'C' }
    event.dataTransfer.setData(format.chordData, JSON.stringify(chordNodeData))
    event.dataTransfer.setData(format.nodeType, nodeTypeNames.ChordNode)
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDragOverChordNode = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const chordData = JSON.parse(event.dataTransfer.getData(format.chordData)) as ChordNodeData
  }, [])

  // const createDropOnFlowFnc = useCallback(
  //   (reactFlowInstance: ReactFlowInstance | null, callback: (newNode: Node) => void): React.DragEventHandler<HTMLDivElement> => {
  //     return (event: React.DragEvent) => {
  //       event.preventDefault()

  //       // 1. add chord info to new node
  //       const nodeType = event.dataTransfer.getData(format.nodeType)
  //       let newNode: Node | null = null
  //       switch (nodeType) {
  //         case nodeTypeNames.ChordNode:
  //           const chordData = JSON.parse(event.dataTransfer.getData(format.chordData)) as ChordNodeData
  //           newNode = createChordNode(chordData)
  //           break

  //         case nodeTypeNames.KeyTransNode:
  //           // TODO
  //           break

  //         default:
  //           return
  //       }

  //       // 2. add reactflow position info to new node
  //       const { offsetX, offsetY } = event.nativeEvent
  //       const position = reactFlowInstance!.project({
  //         x: offsetX,
  //         y: offsetY,
  //       })
  //       newNode!.position = position

  //       console.log('newNode', newNode)
  //       callback(newNode!)
  //     }
  //   },
  //   []
  // )

  return {
    createDragChordNodeStartFnc,
    onDragChordNodeStart,
    onDragOver,
    // createDropOnFlowFnc
  }
}

export default useDrag
