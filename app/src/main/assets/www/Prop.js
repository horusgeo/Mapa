function Prop(poly, id, tipo, nome){
    this.poly = poly;
    this.id = id;
    this.tipo = tipo;
    this.nome = nome;


    this.getPoly = function() {
        return this.poly;
    };

    this.getId = function() {
        return this.id;
    };

    this.getTipo = function() {
        return this.tipo;
    };

    this.getNome = function() {
        return this.nome;
    };

}
