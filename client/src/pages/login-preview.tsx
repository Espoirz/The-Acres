import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPreview() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🐴 Victory Acres Login Page Preview
          </h1>
          <p className="text-gray-600">
            Stable-Themed Authentication Experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Live Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Live Preview
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Current Design</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-300">
                  {/* Login Page Preview - Scaled Down */}
                  <div 
                    className="w-full h-full flex items-center justify-center relative transform scale-75 origin-center"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Stable Interior Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/60 to-amber-900/80"></div>
                    
                    {/* Wooden Beam Effects */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-amber-800/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-amber-900/90 to-transparent"></div>
                      <div className="absolute left-0 top-0 w-6 h-full bg-gradient-to-r from-amber-800/60 to-transparent"></div>
                      <div className="absolute right-0 top-0 w-6 h-full bg-gradient-to-l from-amber-800/60 to-transparent"></div>
                    </div>
                    
                    {/* Login Card - Scaled */}
                    <Card className="relative z-10 w-80 bg-gradient-to-br from-amber-50/95 via-amber-100/90 to-amber-50/95 border-2 border-amber-700/80 shadow-xl backdrop-blur-lg">
                      <CardContent className="p-4">
                        <div className="text-center mb-4">
                          <div className="mb-2">
                            <div className="w-8 h-8 mx-auto bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-sm">🐴</span>
                            </div>
                          </div>
                          <h1 className="text-lg font-bold text-amber-900 mb-1 font-serif">
                            Everlasting Victory Acres
                          </h1>
                          <p className="text-amber-700 text-xs font-medium">
                            Realistic Breeds Edition
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-amber-100/50 rounded p-2 border border-amber-300">
                            <p className="text-xs text-amber-800 text-center">
                              Advanced breeding simulation with real genetics
                            </p>
                          </div>
                          
                          <Button className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 text-xs py-2 hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
                            🚪 Enter the Stables
                          </Button>
                          
                          <div className="grid grid-cols-3 gap-1 text-center text-xs text-amber-700">
                            <div className="bg-amber-200/50 p-1 rounded border border-amber-300">
                              <div className="font-bold text-xs">15+</div>
                              <div className="text-xs">Genes</div>
                            </div>
                            <div className="bg-amber-200/50 p-1 rounded border border-amber-300">
                              <div className="font-bold text-xs">Real</div>
                              <div className="text-xs">DNA</div>
                            </div>
                            <div className="bg-amber-200/50 p-1 rounded border border-amber-300">
                              <div className="font-bold text-xs">Pro</div>
                              <div className="text-xs">Breed</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button 
                onClick={() => window.open('/', '_blank')}
                className="flex-1 bg-amber-700 hover:bg-amber-800 text-white"
              >
                🔗 View Full Size
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-amber-700 text-amber-700 hover:bg-amber-50"
              >
                🔄 Refresh
              </Button>
            </div>
          </div>

          {/* Design Details */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Design Features
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Stable Theme</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-amber-800">Authentic Stable Interior</h4>
                      <p className="text-sm text-gray-600">Wood-paneled stable background with realistic lighting</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-amber-800">Immersive Overlays</h4>
                      <p className="text-sm text-gray-600">Wooden beam effects and depth layering</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-amber-800">Equestrian Branding</h4>
                      <p className="text-sm text-gray-600">Horse emoji, rustic colors, and stable-themed copy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-amber-800">Feature Highlights</h4>
                      <p className="text-sm text-gray-600">Showcases advanced genetics and breeding features</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎨 Color Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="w-full h-8 bg-amber-900 rounded mb-1"></div>
                    <div className="text-xs text-gray-600">Primary</div>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-8 bg-amber-700 rounded mb-1"></div>
                    <div className="text-xs text-gray-600">Accent</div>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-8 bg-amber-100 rounded mb-1"></div>
                    <div className="text-xs text-gray-600">Light</div>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-8 bg-amber-50 rounded mb-1"></div>
                    <div className="text-xs text-gray-600">Background</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📱 Responsive Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Desktop</span>
                  <span className="border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">✅ Optimized</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Tablet</span>
                  <span className="border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">✅ Responsive</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Mobile</span>
                  <span className="border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded">✅ Adaptive</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🚀 Implementation Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Login Page Updated</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✅ Complete</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Stable Theme Applied</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✅ Complete</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Responsive Design</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✅ Complete</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ready for Production</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✅ Ready</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                🏇 Stable-Themed Login Experience Ready!
              </h3>
              <p className="text-amber-800 mb-4">
                Your login page now features an authentic stable interior with immersive equestrian theming that perfectly matches Victory Acres' breeding simulation experience.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => window.open('/', '_blank')}
                  className="bg-amber-700 hover:bg-amber-800 text-white"
                >
                  🔗 Test Login Page
                </Button>
                <Button 
                  variant="outline"
                  className="border-amber-700 text-amber-700 hover:bg-amber-50"
                >
                  📝 View Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}