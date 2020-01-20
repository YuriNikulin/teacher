import React from 'react';
import Preloader from '@components/Preloader/Preloader';

interface Props {
  children: React.ReactElement | React.ReactElement[];
  onDragEnd: (params: OnDragEndParams) => any;
}

export interface OnDragEndParams {
  id: string;
  source: number;
  destination: number;
}

function _Draggable(props: Props) {
  const { children, onDragEnd } = props;
  const [DraggableComponent, setDraggableComponent] = React.useState<any>(null);
  React.useEffect(() => {
    import('react-beautiful-dnd').then(Module => {
      setDraggableComponent(Module);
    });
  });

  const handleDragEnd = (result: any) => {
    onDragEnd({
      id: result.draggableId,
      source: result.source.index,
      destination: result.destination.index,
    });
  };

  if (!DraggableComponent) {
    return <Preloader position="absolute" />;
  }

  const { DragDropContext, Droppable, Draggable } = DraggableComponent;
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="id">
        {(provided: any) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {React.Children.map(children, (child, index) => {
                const WrappedChild = (props: any) => React.cloneElement(child, props);
                return (
                  <Draggable draggableId={child.props.id} index={index} key={child.props.id}>
                    {(provided: any, snapshot: any) => {
                      return (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <WrappedChild isDragging={snapshot.isDragging} />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default _Draggable;
