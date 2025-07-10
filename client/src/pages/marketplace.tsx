import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Search, Filter, Star, DollarSign, Eye } from "lucide-react";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [animalTypeFilter, setAnimalTypeFilter] = useState("all");
  const [breedFilter, setBreedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { toast } = useToast();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['/api/marketplace', { 
      animalType: animalTypeFilter !== "all" ? animalTypeFilter : undefined,
      breed: breedFilter !== "all" ? breedFilter : undefined,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      sortBy: sortBy !== "newest" ? sortBy : undefined,
    }],
  });

  const filteredListings = listings.filter((listing: any) => {
    const matchesSearch = listing.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.animal?.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getAnimalImage = (type: string, breed: string) => {
    if (type === "horse") {
      switch (breed.toLowerCase()) {
        case "arabian":
          return "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        case "friesian":
          return "https://images.unsplash.com/photo-1567201080580-bfcc97dae346?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        case "thoroughbred":
          return "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        default:
          return "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
      }
    } else {
      switch (breed.toLowerCase()) {
        case "border collie":
          return "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        case "german shepherd":
          return "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        default:
          return "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
      }
    }
  };

  const calculateOverallRating = (animal: any) => {
    if (!animal) return 0;
    const statSum = animal.speed + animal.endurance + animal.agility + (animal.intelligence || 0) + (animal.loyalty || 0);
    const statCount = animal.type === "horse" ? 3 : 5;
    return (statSum / (statCount * 100) * 5).toFixed(1);
  };

  const handleBuyNow = (listing: any) => {
    toast({
      title: "Purchase Initiated",
      description: `Purchasing ${listing.animal?.name} for $${listing.price?.toLocaleString()}`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(45,50%,96%)] to-[hsl(25,30%,85%)]">
        <Navigation />
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[hsl(25,30%,80%)] rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-[hsl(25,30%,80%)] rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(45,50%,96%)] to-[hsl(25,30%,85%)]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[hsl(25,60%,20%)]">Marketplace</h1>
              <p className="text-[hsl(25,45%,35%)]">
                Buy and sell premium horses and dogs from breeders worldwide
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)]">
              List for Sale
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6 bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(25,45%,35%)] w-4 h-4" />
                  <Input
                    placeholder="Search animals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]"
                  />
                </div>
                
                <Select value={animalTypeFilter} onValueChange={setAnimalTypeFilter}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Animal Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Animals</SelectItem>
                    <SelectItem value="horse">Horses</SelectItem>
                    <SelectItem value="dog">Dogs</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={breedFilter} onValueChange={setBreedFilter}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Breeds</SelectItem>
                    <SelectItem value="Arabian">Arabian</SelectItem>
                    <SelectItem value="Friesian">Friesian</SelectItem>
                    <SelectItem value="Thoroughbred">Thoroughbred</SelectItem>
                    <SelectItem value="Border Collie">Border Collie</SelectItem>
                    <SelectItem value="German Shepherd">German Shepherd</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]"
                />

                <Input
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]"
                />

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-[hsl(25,45%,35%)]">
            <Filter className="w-4 h-4" />
            <span>{filteredListings.length} animals found</span>
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
            <CardContent className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No animals found</h3>
              <p className="text-[hsl(25,45%,35%)] mb-4">
                {searchTerm || animalTypeFilter !== "all" || breedFilter !== "all" || minPrice || maxPrice
                  ? "Try adjusting your search filters" 
                  : "No animals are currently for sale in the marketplace"
                }
              </p>
              <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)]">
                List Your Animal
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing: any) => {
              const animal = listing.animal;
              if (!animal) return null;

              return (
                <Card key={listing.id} className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <img 
                      src={animal.imageUrl || getAnimalImage(animal.type, animal.breed)}
                      alt={`${animal.breed} ${animal.name}`}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-[hsl(25,60%,20%)]">{animal.name}</h3>
                          <p className="text-[hsl(25,50%,40%)]">{animal.breed}</p>
                          <p className="text-sm text-[hsl(25,60%,35%)]">
                            {Math.floor(animal.age / 12)} years old • {animal.gender}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[hsl(40,80%,50%)]">
                            ${listing.price?.toLocaleString()}
                          </p>
                          <p className="text-xs text-[hsl(25,50%,40%)]">
                            by {listing.seller?.firstName || 'Breeder'}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[hsl(25,60%,35%)]">Overall Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-[hsl(40,80%,50%)]" />
                          <span className="text-[hsl(25,50%,40%)] font-bold">
                            {calculateOverallRating(animal)}
                          </span>
                        </div>
                      </div>

                      {/* Key Stats Preview */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-[hsl(25,30%,85%)] rounded">
                          <div className="font-semibold text-[hsl(25,50%,40%)]">{animal.speed}%</div>
                          <div className="text-[hsl(25,60%,35%)]">Speed</div>
                        </div>
                        <div className="text-center p-2 bg-[hsl(25,30%,85%)] rounded">
                          <div className="font-semibold text-[hsl(25,50%,40%)]">{animal.endurance}%</div>
                          <div className="text-[hsl(25,60%,35%)]">Endurance</div>
                        </div>
                        <div className="text-center p-2 bg-[hsl(25,30%,85%)] rounded">
                          <div className="font-semibold text-[hsl(25,50%,40%)]">{animal.agility}%</div>
                          <div className="text-[hsl(25,60%,35%)]">Agility</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-[hsl(25,40%,60%)] text-[hsl(25,80%,15%)] hover:bg-[hsl(40,70%,55%)]"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleBuyNow(listing)}
                          className="flex-1 bg-[hsl(25,60%,35%)] text-[hsl(45,50%,96%)] hover:bg-[hsl(25,50%,40%)]"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
