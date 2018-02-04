export function same(a1, a2, stride, n) {
	for (var i = 0; i < n; i += stride) {
		if (a1[i] !== a2[i]) {
			return false
		}
	}
	return true
}

// copy an array, creating a new array if necessary
// usage: dst = copyImage(src, dst)
// based on http://jsperf.com/new-array-vs-splice-vs-slice/113
export function copyImage(src, dst) {
	var n = src.length
	if (!dst || dst.length !== n) {
		dst = new src.constructor(n)
	}
	while (n--) {
		dst[n] = src[n]
	}
	return dst
}

export class Graph {
	constructor(p, historyLength, minValue, maxValue) {
		this.p = p
		this.minValue = minValue
		this.maxValue = maxValue
		this.historyLength = historyLength
		this.history = new Float32Array(historyLength)
		this.index = 0
	}

	addSample(sample) {
		this.history[this.index] = sample
		this.index = (this.index + 1) % this.historyLength
	}

	getNormalizedSample(offset) {
		var i = (this.index + offset) % this.historyLength
		var range = this.maxValue - this.minValue
		return (this.history[i] - this.minValue) / range
	}

	draw(width, height) {
		this.p.push()
		this.p.noFill()
		this.p.strokeWeight(1)
		this.p.beginShape()
		var range = this.maxValue - this.minValue
		for (var offset = 0; offset < this.historyLength; offset++) {
			var i = (this.index + offset) % this.historyLength
			var x = offset * width / this.historyLength
			var normalized = (this.history[i] - this.minValue) / range
			var y = height - normalized * height
			this.p.vertex(x, y)
		}
		this.p.endShape()
		this.p.pop()
	}
}
