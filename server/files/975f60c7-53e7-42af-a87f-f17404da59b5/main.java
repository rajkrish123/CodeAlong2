class Calculation {
    public int sum(int x, int y) {
        return x + y;
    }

    public int sum(int x, int y, int z) {
        return x + y + z;
    }

    public static void main(String[] args){
        Calculation c = new Calculation();
        System.out.println(c.sum(1, 2));  
        System.out.println(c.sum(1, 2, 3));  
    }
}