import React from 'react'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>LISTA DE MESES</h2>
      <div className="sidebar__menu">
        <div className="sidebar__menu__link active">Janeiro de 2022</div>
        <div className="sidebar__menu__link">Fevereiro de 2022</div>
        <div className="sidebar__menu__link">Março de 2022</div>
        <div className="sidebar__menu__link">Abril de 2022</div>
        <div className="sidebar__menu__link">Maio de 2022</div>
        <div className="sidebar__menu__link">Junho de 2022</div>
        <div className="sidebar__menu__link">Julho de 2022</div>
        <div className="sidebar__menu__link">Agosto de 2022</div>
        <div className="sidebar__menu__link">Setembro de 2022</div>
        <div className="sidebar__menu__link">Outubro de 2022</div>
        <div className="sidebar__menu__link">Novembro de 2022</div>
        <div className="sidebar__menu__link">Dezembro de 2022</div>
        <div className="sidebar__menu__link">
          <select name="month">
            <option value="">01</option>
            <option value="">02</option>
          </select>
          <select name="year">
            <option value="">2022</option>
            <option value="">2023</option>
          </select>
          <button type="button">Adicionar mês</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
