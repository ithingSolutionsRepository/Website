import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Users, Building2, Briefcase, Plus, Pencil, Trash2, LogOut, Home, Loader2, Quote, FolderOpen } from "lucide-react";
import { Link } from "wouter";
import type { TeamMember, Client, Service, Testimonial, PortfolioProject } from "@shared/schema";

const teamMemberFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  roleEn: z.string().min(1, "English role is required"),
  roleAr: z.string().min(1, "Arabic role is required"),
  imageUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  sortOrder: z.number().default(0),
});

const clientFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  logoUrl: z.string().optional(),
  icon: z.string().optional(),
  sortOrder: z.number().default(0),
});

const serviceFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  icon: z.string().min(1, "Icon is required"),
  sortOrder: z.number().default(0),
});

const testimonialFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  companyEn: z.string().min(1, "English company is required"),
  companyAr: z.string().min(1, "Arabic company is required"),
  textEn: z.string().min(1, "English text is required"),
  textAr: z.string().min(1, "Arabic text is required"),
  rating: z.number().default(5),
  sortOrder: z.number().default(0),
});

const portfolioFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  imageUrl: z.string().optional(),
  tagsEn: z.string().optional(),
  tagsAr: z.string().optional(),
  sortOrder: z.number().default(0),
});

export default function Dashboard() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({ title: "Please log in", description: "Redirecting to login...", variant: "destructive" });
      setTimeout(() => { window.location.href = "/api/login"; }, 500);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-primary">iThing Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.firstName || user?.email}
            </span>
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-home">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => logout()} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="team" className="flex items-center gap-2" data-testid="tab-team">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2" data-testid="tab-clients">
              <Building2 className="w-4 h-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2" data-testid="tab-services">
              <Briefcase className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2" data-testid="tab-testimonials">
              <Quote className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2" data-testid="tab-portfolio">
              <FolderOpen className="w-4 h-4" />
              Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <TeamSection />
          </TabsContent>
          <TabsContent value="clients">
            <ClientsSection />
          </TabsContent>
          <TabsContent value="services">
            <ServicesSection />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsSection />
          </TabsContent>
          <TabsContent value="portfolio">
            <PortfolioSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function TeamSection() {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/admin/team"],
  });

  const form = useForm<z.infer<typeof teamMemberFormSchema>>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: {
      nameEn: "",
      nameAr: "",
      roleEn: "",
      roleAr: "",
      imageUrl: "",
      linkedinUrl: "",
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof teamMemberFormSchema>) =>
      apiRequest("POST", "/api/admin/team", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/team"] });
      toast({ title: "Success", description: "Team member created" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to create team member", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: z.infer<typeof teamMemberFormSchema> }) =>
      apiRequest("PUT", `/api/admin/team/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/team"] });
      toast({ title: "Success", description: "Team member updated" });
      setIsDialogOpen(false);
      setEditingMember(null);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to update team member", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/team/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/team"] });
      toast({ title: "Success", description: "Team member deleted" });
    },
    onError: () => toast({ title: "Error", description: "Failed to delete team member", variant: "destructive" }),
  });

  const onSubmit = (data: z.infer<typeof teamMemberFormSchema>) => {
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    form.reset({
      nameEn: member.nameEn,
      nameAr: member.nameAr,
      roleEn: member.roleEn,
      roleAr: member.roleAr,
      imageUrl: member.imageUrl || "",
      linkedinUrl: member.linkedinUrl || "",
      sortOrder: member.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingMember(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Team Members</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} data-testid="button-add-team">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Edit" : "Add"} Team Member</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="nameEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (English)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-name-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="nameAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Arabic)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-name-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="roleEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role (English)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-role-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="roleAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role (Arabic)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-role-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-image-url" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="linkedinUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL (optional)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-linkedin-url" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sortOrder" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} data-testid="input-sort-order" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-team">
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingMember ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : teamMembers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No team members yet. Add your first one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id} className="relative" data-testid={`card-team-${member.id}`}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.nameEn} className="w-20 h-20 rounded-full object-cover mb-4" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-primary">{member.nameEn.charAt(0)}</span>
                      </div>
                    )}
                    <h3 className="font-semibold">{member.nameEn}</h3>
                    <p className="text-sm text-muted-foreground">{member.roleEn}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(member)} data-testid={`button-edit-team-${member.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(member.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-team-${member.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ClientsSection() {
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ["/api/admin/clients"],
  });

  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: { nameEn: "", nameAr: "", logoUrl: "", icon: "", sortOrder: 0 },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof clientFormSchema>) => apiRequest("POST", "/api/admin/clients", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/clients"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/clients"] });
      toast({ title: "Success", description: "Client created" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to create client", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: z.infer<typeof clientFormSchema> }) =>
      apiRequest("PUT", `/api/admin/clients/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/clients"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/clients"] });
      toast({ title: "Success", description: "Client updated" });
      setIsDialogOpen(false);
      setEditingClient(null);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to update client", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/clients/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/clients"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/clients"] });
      toast({ title: "Success", description: "Client deleted" });
    },
    onError: () => toast({ title: "Error", description: "Failed to delete client", variant: "destructive" }),
  });

  const onSubmit = (data: z.infer<typeof clientFormSchema>) => {
    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (client: Client) => {
    setEditingClient(client);
    form.reset({
      nameEn: client.nameEn,
      nameAr: client.nameAr,
      logoUrl: client.logoUrl || "",
      icon: client.icon || "",
      sortOrder: client.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingClient(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Clients</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} data-testid="button-add-client">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit" : "Add"} Client</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="nameEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (English)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-client-name-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="nameAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Arabic)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-client-name-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="logoUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL (optional)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-client-logo" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="icon" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon name (optional, e.g., Building2)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-client-icon" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sortOrder" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} data-testid="input-client-sort" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-client">
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingClient ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : clients.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No clients yet. Add your first one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <Card key={client.id} data-testid={`card-client-${client.id}`}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    {client.logoUrl ? (
                      <img src={client.logoUrl} alt={client.nameEn} className="w-16 h-16 object-contain mb-4" />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <h3 className="font-semibold">{client.nameEn}</h3>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(client)} data-testid={`button-edit-client-${client.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(client.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-client-${client.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ServicesSection() {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
  });

  const form = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: { titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "", icon: "", sortOrder: 0 },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof serviceFormSchema>) => apiRequest("POST", "/api/admin/services", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/services"] });
      toast({ title: "Success", description: "Service created" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to create service", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: z.infer<typeof serviceFormSchema> }) =>
      apiRequest("PUT", `/api/admin/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/services"] });
      toast({ title: "Success", description: "Service updated" });
      setIsDialogOpen(false);
      setEditingService(null);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to update service", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/services"] });
      toast({ title: "Success", description: "Service deleted" });
    },
    onError: () => toast({ title: "Error", description: "Failed to delete service", variant: "destructive" }),
  });

  const onSubmit = (data: z.infer<typeof serviceFormSchema>) => {
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    form.reset({
      titleEn: service.titleEn,
      titleAr: service.titleAr,
      descriptionEn: service.descriptionEn,
      descriptionAr: service.descriptionAr,
      icon: service.icon,
      sortOrder: service.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingService(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Services</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} data-testid="button-add-service">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit" : "Add"} Service</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="titleEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (English)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-service-title-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="titleAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Arabic)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-service-title-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="descriptionEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (English)</FormLabel>
                    <FormControl><Textarea {...field} rows={3} data-testid="input-service-desc-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="descriptionAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Arabic)</FormLabel>
                    <FormControl><Textarea {...field} dir="rtl" rows={3} data-testid="input-service-desc-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="icon" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon name (e.g., Brain, Cloud, Code)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-service-icon" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sortOrder" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} data-testid="input-service-sort" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-service">
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingService ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : services.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No services yet. Add your first one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} data-testid={`card-service-${service.id}`}>
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{service.titleEn}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{service.descriptionEn}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(service)} data-testid={`button-edit-service-${service.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(service.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-service-${service.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TestimonialsSection() {
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
  });

  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      nameEn: "",
      nameAr: "",
      companyEn: "",
      companyAr: "",
      textEn: "",
      textAr: "",
      rating: 5,
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof testimonialFormSchema>) =>
      apiRequest("POST", "/api/admin/testimonials", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      toast({ title: "Success", description: "Testimonial created" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to create testimonial", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: z.infer<typeof testimonialFormSchema> }) =>
      apiRequest("PUT", `/api/admin/testimonials/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      toast({ title: "Success", description: "Testimonial updated" });
      setIsDialogOpen(false);
      setEditingTestimonial(null);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to update testimonial", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/testimonials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/testimonials"] });
      toast({ title: "Success", description: "Testimonial deleted" });
    },
    onError: () => toast({ title: "Error", description: "Failed to delete testimonial", variant: "destructive" }),
  });

  const onSubmit = (data: z.infer<typeof testimonialFormSchema>) => {
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    form.reset({
      nameEn: testimonial.nameEn,
      nameAr: testimonial.nameAr,
      companyEn: testimonial.companyEn,
      companyAr: testimonial.companyAr,
      textEn: testimonial.textEn,
      textAr: testimonial.textAr,
      rating: testimonial.rating || 5,
      sortOrder: testimonial.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Testimonials</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} data-testid="button-add-testimonial">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit" : "Add"} Testimonial</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="nameEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (English)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-testimonial-name-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="nameAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Arabic)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-testimonial-name-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="companyEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (English)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-testimonial-company-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="companyAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Arabic)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-testimonial-company-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="textEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial Text (English)</FormLabel>
                    <FormControl><Textarea {...field} rows={3} data-testid="input-testimonial-text-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="textAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial Text (Arabic)</FormLabel>
                    <FormControl><Textarea {...field} dir="rtl" rows={3} data-testid="input-testimonial-text-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="rating" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (1-5)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={5} {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 5)} data-testid="input-testimonial-rating" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sortOrder" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} data-testid="input-testimonial-sort" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-testimonial">
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingTestimonial ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No testimonials yet. Add your first one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} data-testid={`card-testimonial-${testimonial.id}`}>
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{testimonial.nameEn}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.companyEn}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{testimonial.textEn}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(testimonial)} data-testid={`button-edit-testimonial-${testimonial.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(testimonial.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-testimonial-${testimonial.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PortfolioSection() {
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/admin/portfolio"],
  });

  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      imageUrl: "",
      tagsEn: "",
      tagsAr: "",
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof portfolioFormSchema>) =>
      apiRequest("POST", "/api/admin/portfolio", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/portfolio"] });
      toast({ title: "Success", description: "Portfolio project created" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to create portfolio project", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: z.infer<typeof portfolioFormSchema> }) =>
      apiRequest("PUT", `/api/admin/portfolio/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/portfolio"] });
      toast({ title: "Success", description: "Portfolio project updated" });
      setIsDialogOpen(false);
      setEditingProject(null);
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Failed to update portfolio project", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/portfolio/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content/portfolio"] });
      toast({ title: "Success", description: "Portfolio project deleted" });
    },
    onError: () => toast({ title: "Error", description: "Failed to delete portfolio project", variant: "destructive" }),
  });

  const onSubmit = (data: z.infer<typeof portfolioFormSchema>) => {
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (project: PortfolioProject) => {
    setEditingProject(project);
    form.reset({
      titleEn: project.titleEn,
      titleAr: project.titleAr,
      descriptionEn: project.descriptionEn,
      descriptionAr: project.descriptionAr,
      imageUrl: project.imageUrl || "",
      tagsEn: project.tagsEn || "",
      tagsAr: project.tagsAr || "",
      sortOrder: project.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingProject(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Portfolio Projects</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} data-testid="button-add-portfolio">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit" : "Add"} Portfolio Project</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="titleEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (English)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-portfolio-title-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="titleAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Arabic)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-portfolio-title-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="descriptionEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (English)</FormLabel>
                    <FormControl><Textarea {...field} rows={3} data-testid="input-portfolio-desc-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="descriptionAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Arabic)</FormLabel>
                    <FormControl><Textarea {...field} dir="rtl" rows={3} data-testid="input-portfolio-desc-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-portfolio-image" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="tagsEn" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (English, comma-separated)</FormLabel>
                    <FormControl><Input {...field} data-testid="input-portfolio-tags-en" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="tagsAr" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (Arabic, comma-separated)</FormLabel>
                    <FormControl><Input {...field} dir="rtl" data-testid="input-portfolio-tags-ar" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sortOrder" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} data-testid="input-portfolio-sort" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-portfolio">
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingProject ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : projects.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No portfolio projects yet. Add your first one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} data-testid={`card-portfolio-${project.id}`}>
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.titleEn} className="w-full h-32 object-cover rounded-md mb-4" />
                    ) : (
                      <div className="w-full h-32 rounded-md bg-primary/20 flex items-center justify-center mb-4">
                        <FolderOpen className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <h3 className="font-semibold">{project.titleEn}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.descriptionEn}</p>
                    {project.tagsEn && (
                      <p className="text-xs text-muted-foreground mt-2">{project.tagsEn}</p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(project)} data-testid={`button-edit-portfolio-${project.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(project.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-portfolio-${project.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
