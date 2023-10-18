<template>
  <div>
    <p>maxColumns 3 + minColumns 2</p>
    <FormGrid :max-columns="3" :min-columns="2" :column-gap="4">
      <FormGridColumn :grid-span="4">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>maxColumns 3</p>
    <FormGrid :max-columns="3" :column-gap="4">
      <FormGridColumn :grid-span="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>minColumns 2</p>
    <FormGrid :min-columns="2" :column-gap="4">
      <FormGridColumn :grid-span="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>Null</p>
    <FormGrid :column-gap="4">
      <FormGridColumn :grid-span="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>minWidth 150 +maxColumns 3</p>
    <FormGrid :min-width="150" :max-columns="3" :column-gap="4">
      <FormGridColumn :grid-span="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>maxWidth 120+minColumns 2</p>
    <FormGrid :max-width="120" :min-columns="2" :column-gap="4">
      <FormGridColumn :grid-span="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>3</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>4</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>5</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>6</Cell>
      </FormGridColumn>
    </FormGrid>
    <p>maxWidth 120 + gridSpan -1</p>
    <FormGrid :max-width="120" :column-gap="4">
      <FormGridColumn :grid-span="2">
        <Cell>1</Cell>
      </FormGridColumn>
      <FormGridColumn>
        <Cell>2</Cell>
      </FormGridColumn>
      <FormGridColumn :grid-span="-1">
        <Cell>3</Cell>
      </FormGridColumn>
    </FormGrid>
  </div>
</template>

<script lang="tsx">
import { FormGrid } from '@formily/antdv'

const Cell = (props, { slots }) => {
  return (
    <div
      style={{
        backgroundColor: '#AAA',
        color: '#FFF',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px'
      }}
    >
      {slots?.default?.()}
    </div>
  )
}

export default {
  components: { FormGrid, FormGridColumn: FormGrid.GridColumn, Cell }
}
</script>
