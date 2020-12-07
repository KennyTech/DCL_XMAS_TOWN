// Present Class
@Component('present')
export class Present {
    isFired: boolean = false
    life: number = 10
    presentBody: CANNON.Body = new CANNON.Body({
      mass: 3, // kg
      position: new CANNON.Vec3(this.presentTransform.x, this.presentTransform.y, this.presentTransform.z), // m
      shape: new CANNON.Sphere(0.2), // m (Create sphere shaped body with a radius of 0.2)
    })
    id: number
    colorIndex: number
    constructor(public presentTransform: Vector3) {}
}