from dataclasses import fields
from tokenize import PseudoExtras
#from msilib.schema import tables
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from flask_marshmallow import Marshmallow
import pymysql
pymysql.install_as_MySQLdb()
from datetime import date


app = Flask(__name__)


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)

# TABLE PRESTATIONS
class prestations(db.Model):
    numprest = db.Column(db.Integer, primary_key=True)
    numcompte = db.Column(db.Integer)
    titreprest = db.Column(db.String(255), nullable=False)
    descprest = db.Column(db.Text())
    lienprest = db.Column(db.String(255))


    def __init__(self, numcompte, titreprest, descprest, lienprest):
        self.numcompte = numcompte
        self.titreprest = titreprest
        self.descprest = descprest
        self.lienprest = lienprest
    def __repr__(self):
        return '<Name %r>' % self.numprest

# TABLE COMPTE
class compte(db.Model):
    numcompte = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255))
    prenom = db.Column(db.String(255))
    pseudo = db.Column(db.String(255), nullable=False)
    motdepasse = db.Column(db.String(255))
    ville = db.Column(db.String(255))
    tel = db.Column(db.String(255))
    mail = db.Column(db.String(255))
    numphoto = db.Column(db.Integer)


    def __init__(self, nom, prenom, pseudo, motdepasse, ville, tel, mail, numphoto):
        self.nom = nom
        self.prenom = prenom
        self.pseudo = pseudo
        self.motdepasse = motdepasse
        self.ville = ville
        self.tel = tel
        self.mail = mail
        self.numphoto = numphoto
    def __repr__(self):
        return '<Name %r>' % self.numprest

# TABLE SCENES
class scenes(db.Model):
    numscene = db.Column(db.Integer, primary_key=True)
    numcompte = db.Column(db.Integer, db.ForeignKey('compte.numcompte'))
    titrescene = db.Column(db.String(255), nullable=False)
    descscene = db.Column(db.Text())
    datescene = db.Column(db.DateTime, default = date.today())
    criteres = db.Column(db.String(255))
    recurrence = db.Column(db.String(255))
    adrscene = db.Column(db.String(255))
    numphoto = db.Column(db.Integer)



    def __init__(self, numcompte, titrescene, descscene, datescene, criteres, recurrence, adrscene, numphoto):
        self.numcompte = numcompte
        self.titrescene = titrescene
        self.descscene = descscene
        self.datescene = datescene
        self.criteres=criteres
        self.recurrence=recurrence
        self.adrscene=adrscene
        self.numphoto=numphoto
    def __repr__(self):
        return '<Name %r>' % self.numscene

#________________________________
#SCHEMAS FOR PRESTATIONS
class PrestaSchema(ma.Schema):
    class Meta:
        fields = ('numprest', 'numcompte', 'titreprest',
                  'descprest', 'lienprest')


presta_Schema = PrestaSchema()
prestas_Schema = PrestaSchema(many=True)

#________________________________
#SCHEMAS FOR SCENES
class SceneSchema(ma.Schema):
    class Meta:
        fields = ('numscene', 'numcompte', 'titrescene', 'descscene',
                  'datescene', 'criteres', 'recurrence', 'adrscene', 'numphoto')


scene_Schema = SceneSchema()
scenes_Schema = SceneSchema(many=True)

#________________________________
# FUNCTIONS FOR PRESTATIONS TABLE
@app.route('/prestafiltered/<numprest>', methods = ['GET'])
def get_filtered_prestations(numprest):
    presta = prestations.query.filter(prestations.numprest == numprest).all()
    print("presta= ", presta)
    results = prestas_Schema.dump(presta, many = True)
#    print("results= " , results)
    return jsonify(results)

@app.route('/getpresta', methods = ['GET'])
def get_prestations():
    all_prestas = prestations.query.all()
    results = prestas_Schema.dump(all_prestas)
    return jsonify(results)


@app.route('/getpresta/<numprest>', methods = ['GET'])
def get_prestation(numprest):
    presta = prestations.query.get(numprest)
    return presta_Schema.jsonify(presta)


@app.route('/addpresta', methods = ['POST'])
def add_presta():
    numcompte = request.json['numcompte']
    titreprest = request.json['titreprest']
    descprest = request.json['descprest']
    lienprest = request.json['lienprest']

    presta = prestations(numcompte, titreprest, descprest, lienprest)
    db.session.add(presta)
    db.session.commit()
    return presta_Schema.jsonify(presta)


@app.route('/updatepresta/<numprest>', methods = ['PUT'])
def update_presta(numprest):
    presta = prestations.query.get(numprest)
    numcompte = request.json['numcompte']
    titreprest = request.json['titreprest']
    descprest = request.json['descprest']
    lienprest = request.json['lienprest']

    presta.numcompte = int(numcompte)
    presta.titreprest = titreprest
    presta.descprest = descprest
    presta.lienprest = lienprest

    db.session.commit()
    return presta_Schema.jsonify(presta)


@app.route('/deletepresta/<numprest>', methods = ['DELETE'])
def delete_presta(numprest):
    presta = prestations.query.get(numprest)
    try:
        db.session.delete(presta)
        db.session.commit()
        return presta_Schema.jsonify(presta)
    except:
        return "Delete not done: " + presta.numprest + "-" + presta.titreprest

#________________________________
# FUNCTIONS FOR SCENES TABLE
@app.route('/scenefiltered/<params>', methods = ['GET'])
def get_filtered_sceneslong(params):
    if params.index == 1: scene = scenes.query.filter(scenes.numscene == int(params.test)).all()
    elif params.index == 2: scene = scenes.query.filter(scenes.titrescene == params.test).all()
    elif params.index == 3: scene = scenes.query.filter(scenes.descscene == params.test).all()
    elif params.index == 4: scene = scenes.query.filter(scenes.datescene < params.test).all()
    elif params.index == 5: scene = scenes.query.filter(scenes.datescene == params.test).all()
    elif params.index == 6: scene = scenes.query.filter(scenes.datescene > params.test).all()
    elif params.index == 7: scene = scenes.query.filter(params.test in scenes.criteres).all()
    elif params.index == 8: scene = scenes.query.filter(scenes.recurrence == params.test ).all()
    elif params.index == 9: scene = scenes.query.filter(scenes.adrscene == params.test).all()
    else : scene = scenes.query.filter(scenes.numphoto == int(params.test)).all()

    print("scene= ", scene)
    results = scenes_Schema.dump(scene, many = True)
#    print("results= " , results)
    return jsonify(results)

@app.route('/getfilteredscene/<numscene>', methods = ['GET'])
def get_filtered_scenes(numscene):
    scene = scenes.query.filter(scenes.numscene == numscene).all()
    print("scene= ", scene)
    results = scenes_Schema.dump(scene, many = True)
#    print("results= " , results)
    return jsonify(results)

@app.route('/getscene', methods = ['GET'])
def get_scenes():
    all_scenes = scenes.query.all()
    results = scenes_Schema.dump(all_scenes)
    return jsonify(results)

@app.route('/getscene/<numscene>', methods = ['GET'])
def get_scene(numscene):
    scene = scenes.query.get(numscene)
    return scene_Schema.jsonify(scene)

@app.route('/addscene', methods = ['POST'])
def add_scene():
    numcompte = request.json['numcompte']
    titrescene = request.json['titrescene']
    descscene  = request.json['descscene']
    datescene  = request.json['datescene']
    criteres = request.json['criteres']
    recurrence = request.json['recurrence']
    adrscene  = request.json['adrscene']
    numphoto  = request.json['numphoto']
    scene = scenes(numcompte, titrescene, descscene, datescene, criteres, recurrence, adrscene, numphoto)
    db.session.add(scene)
    db.session.commit()
    return scene_Schema.jsonify(scene)


@app.route('/updatescene/<numscene>', methods = ['PUT'])
def update_scene(numscene):
    scene = scenes.query.get(numscene)
    numcompte = request.json['numcompte']
    titrescene = request.json['titrescene']
    descscene  = request.json['descscene']
    datescene  = request.json['datescene']
    criteres = request.json['criteres']
    recurrence = request.json['recurrence']
    adrscene  = request.json['adrscene']
    numphoto  = request.json['numphoto']

    scene.numcompte = int(numcompte)
    scene.titrescene = titrescene
    scene.descscene = descscene
    scene.datescene = datescene
    scene.criteres = criteres
    scene.recurrence = recurrence
    scene.adrscene = adrscene
    scene.numphoto = numphoto

    db.session.commit()
    return scene_Schema.jsonify(scene)


@app.route('/deletescene/<numscene>', methods = ['DELETE'])
def delete_scene(numscene):
    scene = scenes.query.get(numscene)
    try:
        db.session.delete(scene)
        db.session.commit()
        return scene_Schema.jsonify(scene)
    except:
        return "Delete not done: " + scene.numscene + "-" + scene.titrescene

if __name__ == "__main__":
    app.run(host='64.225.72.25', port=5000, debug=True)