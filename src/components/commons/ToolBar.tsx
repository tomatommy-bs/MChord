import useDrag from '../../hooks/useDrag'
import { useState } from 'react'
import { Chord } from '@tonaljs/tonal'
import { Box, Center, Input, Paper, Tabs, createStyles, rem } from '@mantine/core'
import { Icon } from '@iconify/react'

const useStyle = createStyles((theme) => ({
  node: {
    backgroundColor: theme.colors.white,
    padding: 2,
    width: 'fit-content',
    border: '1px dashed black',
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 80,
      height: 40,
    },
  },
  validNode: {
    backgroundColor: theme.colors.smoke,
    boxShadow: `0px 4px 6px ${theme.colors.gray[5]}`,
    border: 'none',
    cursor: 'grab',
    ':hover': {
      transition: '100ms',
      transform: `translateY(${rem(-8)})`,
    },
  },
  tabPanelContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: 8,
    fontWeight: 'bold',
  },
}))

const ToolBar = () => {
  const [chordName, setChordName] = useState('')
  const [key, setKey] = useState('')
  let isValidChordName = !Chord.get(chordName).empty
  const { createDragChordNodeStartFnc } = useDrag()
  const onDragStart = createDragChordNodeStartFnc(chordName, key)

  const { classes } = useStyle()

  return (
    <Paper shadow="md">
      <Tabs orientation="vertical" defaultValue={'add'} w={400}>
        <Tabs.List>
          <Tabs.Tab value="add" icon={<Icon icon={'zondicons:add-outline'} />} />
          <Tabs.Tab value="edit" icon={<Icon icon={'uil:edit'} />} />
        </Tabs.List>
        <Tabs.Panel value="add" className={classes.tabPanelContainer}>
          <Box miw={100}>
            <Center>
              <div
                className={`${classes.node} ${isValidChordName && classes.validNode}`}
                onDragStart={onDragStart}
                draggable={isValidChordName}
              >
                <span>{isValidChordName ? Chord.get(chordName).symbol : '?'}</span>
              </div>
            </Center>
          </Box>
          <Input size="md" value={chordName} onChange={(e) => setChordName(e.target.value)} />
        </Tabs.Panel>
        <Tabs.Panel value="edit" className={classes.tabPanelContainer}>
          <div className={classes.node} onDragStart={onDragStart} draggable={isValidChordName}>
            <Center>
              <p>{isValidChordName ? Chord.get(chordName).symbol : '?'}</p>
            </Center>
          </div>

          <Input size="md" value={chordName} onChange={(e) => setChordName(e.target.value)} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}

export default ToolBar
