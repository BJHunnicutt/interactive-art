//========= PARTICLE SYSTEM ===========

/**
 * A basic particle system class
 * @param num the number of particles
 * @param v the origin of the particle system
 * @param img_ a texture for each particle in the system
 * @constructor
 */
const ParticleSystem = function(p, num, v, img_) {
	// p is the p5 object using hte ParticleSystem
	this.p = p

	this.particles = []
	this.origin = v.copy() // we make sure to copy the vector value in case we accidentally mutate the original by accident
	this.img = img_

	for (var i = 0; i < num; ++i) {
		this.particles.push(new Particle(this.origin, this.img))
	}
}

/**
 * This function runs the entire particle system.
 */
ParticleSystem.prototype.run = function() {
	// cache length of the array we're going to loop into a variable
	// You may see <variable>.length in a for loop, from time to time but
	// we cache it here because otherwise the length is re-calculated for each iteration of a loop
	var len = this.particles.length

	//loop through and run particles
	for (var i = len - 1; i >= 0; i--) {
		var particle = this.particles[i]
		particle.run()

		// if the particle is dead, we remove it.
		// javascript arrays don't have a "remove" function but "splice" works just as well.
		// we feed it an index to start at, then how many numbers from that point to remove.
		if (particle.isDead()) {
			this.particles.splice(i, 1)
		}
	}
}

/**
 * Method to add a force vector to all particles currently in the system
 * @param dir a p5.Vector describing the direction of the force.
 */
ParticleSystem.prototype.applyForce = function(dir) {
	var len = this.particles.length
	// console.log('len', len)
	for (var i = 0; i < len; ++i) {
		this.particles[i].applyForce(dir)
	}
}

/**
 * Adds a new particle to the system at the origin of the system and with
 * the originally set texture.
 */
ParticleSystem.prototype.addParticle = function() {
	this.particles.push(new Particle(this.p, this.origin, this.img))
}

//========= PARTICLE  ===========
/**
 *  A simple Particle class, renders the particle as an image
 */
const Particle = function(p, pos, img_) {
	// p is the p5 instance
	this.p = p

	this.loc = pos.copy()

	var vx = this.p.randomGaussian() * 0.3
	var vy = this.p.randomGaussian() * 0.3 - 1.0

	this.vel = this.p.createVector(vx, vy)
	this.acc = this.p.createVector()
	this.lifespan = 100.0
	this.texture = img_
}

/**
 *  Simulataneously updates and displays a particle.
 */
Particle.prototype.run = function() {
	this.update()
	this.render()
}

/**
 *  A function to display a particle
 */
Particle.prototype.render = function() {
	this.p.imageMode(this.p.CENTER)
	// Added '2 * ' below and dounbled the rate that the lifespan is decreased on
	// Update() so that there are few particles
	this.p.tint(255, 2 * this.lifespan)
	this.p.image(this.texture, this.loc.x, this.loc.y)
}

/**
 *  A method to apply a force vector to a particle.
 */
Particle.prototype.applyForce = function(f) {
	this.acc.add(f)
}

/**
 *  This method checks to see if the particle has reached the end of it's lifespan,
 *  if it has, return true, otherwise return false.
 */
Particle.prototype.isDead = function() {
	if (this.lifespan <= 0.0) {
		return true
	} else {
		return false
	}
}

/**
 *  This method updates the position of the particle.
 */
Particle.prototype.update = function() {
	this.vel.add(this.acc)
	this.loc.add(this.vel)
	// this.lifespan -= 2.5
	this.lifespan -= 7.5
	this.acc.mult(0)
}

export default ParticleSystem
