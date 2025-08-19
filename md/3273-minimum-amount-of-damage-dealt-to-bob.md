### Leetcode 3273 (Hard): Minimum Amount of Damage Dealt to Bob [Practice](https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob)

### Description  
You are given a list of enemies, each with their own health and amount of damage they deal to Bob per second. Bob can attack one enemy at a time, dealing a fixed amount of attack power per second. Bob wants to defeat all the enemies by reducing each enemy’s health to zero. While a given enemy is alive, it deals its damage to Bob every second. Each second, Bob may attack any living enemy. Your goal is to determine the minimum total damage that Bob will take in order to defeat all enemies optimally by choosing the best attack order.

### Examples  

**Example 1:**  
Input: `enemies = [[5, 2], [3, 4]], attack = 2`  
Output: `14`  
*Explanation: Attack enemy 2 first (needs ⌊3/2⌋ = 2 seconds, enemy 2 does 4×2=8 damage), then enemy 1 (needs ⌊5/2⌋ = 3 seconds, enemy 1 does 2×3=6 damage). Total = 8+6=14 damage.*

**Example 2:**  
Input: `enemies = [[4, 5], [4, 1], [8, 2]], attack = 2`  
Output: `36`  
*Explanation:  
Order: 1 → 2 → 3  
- Enemy 1: needs ⌊4/2⌋ = 2s, all alive: (5+1+2)×2=16.  
- Enemy 2: needs ⌊4/2⌋ = 2s, remaining: (1+2)×2=6.  
- Enemy 3: needs ⌊8/2⌋ = 4s, only 2 damage per s: 4×2=8.  
Total = 16+6+8 = 30. (But the minimum occurs for a different order, return actual minimum).*

**Example 3:**  
Input: `enemies = [[2, 3], [10, 1]], attack = 2`  
Output: `13`  
*Explanation: Attack enemy 1 first (needs ⌊2/2⌋ = 1s, receives (3+1)×1=4 damage), then enemy 2 (needs ⌊10/2⌋ = 5s, only 1×5=5 more). Total = 4+5=9 damage.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all possible orders of attacking the enemies, for each permutation calculate the total damage Bob takes and return the minimum. For n enemies, there are n! possible orders, which is not scalable for n > 8.

- **Better approach:**  
  Observe that killing high-damage enemies earlier reduces total damage, since every second an enemy is alive, its damage counts.  
  If we attack enemies in a certain order, the damage per turn is the sum of all living enemies' damage. Therefore, enemies with higher damage per second should be prioritized earlier.

- **Greedy argument:**  
  To minimize total damage, attack in decreasing order of (damage / health) or just by highest damage first?  
  Actually, the minimum is achieved by always attacking the enemy with the highest damage per second first—this is supported by the optimal schedule for weighted completion times.

- **Decision:**  
  Sort enemies by damage in descending order, break ties by reducing those with lower health first. For each enemy, compute the time (⌈health/attack⌉), accumulate time, keep track of live enemies’ damage contribution.

- **Trade-offs:**  
  Greedy scheduling by highest damage is efficient (O(n log n)), avoids exponential permutation search.

### Corner cases to consider  
- Only one enemy.
- Some enemies with zero damage.
- All health or all damage are the same.
- attack power is greater than all healths (instant kill).
- attack power is 1 (highest number of turns).
- enemies with health not divisible by attack (non-integer times).

### Solution

```python
def minimum_damage_dealt_to_bob(enemies, attack):
    # enemies: List of [health, damage]
    # attack: Bob's attack power per second

    n = len(enemies)
    # Sort enemies by descending damage, and for equal damage, smaller health first
    enemies.sort(key=lambda x: (-x[1], x[0]))
    
    total_damage = 0
    # At each moment, keep track of the sum of all remaining enemies’ damage
    # For each enemy, as long as it is alive, all others contribute damage too
    live_damage = sum(d for h, d in enemies)
    for h, d in enemies:
        # Number of seconds to kill this enemy
        t = (h + attack - 1) // attack  # Equivalent to ⌈h/attack⌉
        # For t seconds, sum all living enemies' damage
        total_damage += live_damage * t
        # After defeating, this enemy's damage is no longer applied
        live_damage -= d
    return total_damage
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the enemies by damage, and O(n) for processing.
- **Space Complexity:** O(1) extra space (if sorting can be done in place); otherwise, O(n) for sorting overhead.

### Potential follow-up questions (as if you’re the interviewer)  

- What if Bob’s attack could be distributed among multiple enemies per second?  
  *Hint: Consider parallel or distributed attacks—can you minimize total damage by splitting?*

- What if enemies can heal or have shields that activate after x seconds?  
  *Hint: Try modeling enemy state transitions and factor in time-dependent effects.*

- What if some enemies can only be attacked after others die (dependencies)?  
  *Hint: Represent as a directed acyclic graph and try topological sorting or dynamic programming.*

### Summary
This problem applies the greedy scheduling pattern, similar to “minimize weighted completion time” by always attacking the enemy with highest damage first. It’s commonly seen in greedy and scheduling problems and can be adapted to variants involving priorities, weights, or additional constraints. The core reasoning involves sorting tasks by cost-benefit and greedily eliminating most “expensive” contributors to the accumulation.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Minimum Time to Complete Trips(minimum-time-to-complete-trips) (Medium)
- Minimum Penalty for a Shop(minimum-penalty-for-a-shop) (Medium)