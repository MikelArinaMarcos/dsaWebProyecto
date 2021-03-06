package edu.upc.dsa.models;

import java.util.LinkedList;
import java.util.List;

public class Map {

    //revisar modelo Mapa
    private String id;
    private String name;
    private int level;
    //por si no se entende muy bien total significa la cantidad de mapas
    private int total;

    //nos faltará incluir las diferentes listas o arrays sobre items/enemigos/aliados
    //por si hay que modificar bastante
    //añadimos constructor vacio, con ciertos parametros y getter y setters

    //por último un mapa tiene una lista de enemigos y aliados
    //con los que el usuario puede interactuar
    //nos hemos decidido por una LinkedList porque no hay muchos enemigos/aliados
    List <Enemy> enemiesByMap;
    List <Ally> alliesByMap;
    List <Item> itemsByMap;

    public Map() {
    }

    //constructor basico
    public Map(String id, String name, Integer level, Integer total) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.total = total;
        //this.enemiesByMap = new LinkedList<>();
        //this.alliesByMap = new LinkedList<>();
        //this.itemsByMap = new LinkedList<>();
    }

    //getters y setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<Enemy> getEnemiesByMap() {
        return enemiesByMap;
    }

    public void setEnemiesByMap(List<Enemy> enemiesByMap) {
        this.enemiesByMap = enemiesByMap;
    }

    public List<Ally> getAlliesByMap() {
        return alliesByMap;
    }

    public void setAlliesByMap(List<Ally> alliesByMap) {
        this.alliesByMap = alliesByMap;
    }

    public List<Item> getItemsByMap() {
        return itemsByMap;
    }

    public void setItemsByMap(List<Item> itemsByMap) {
        this.itemsByMap = itemsByMap;
    }

    //función añadir enemigo
    public void addEnemy(Enemy enemy){
        this.enemiesByMap.add(enemy);
    }

    //función añadir aliado
    public void addAlly(Ally ally){
        this.alliesByMap.add(ally);
    }

    //función añadir items al mapa
    public void addItem(Item item){
        this.itemsByMap.add(item);
    }

}
