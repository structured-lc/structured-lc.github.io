### Leetcode 3207 (Medium): Maximum Points After Enemy Battles [Practice](https://leetcode.com/problems/maximum-points-after-enemy-battles)

### Description  
You are given a list of **enemy energies** and your **current energy**. In each move, you can either:
- Spend enemyEnergies[i] energy to defeat enemy i and earn 1 point. You may defeat the same enemy multiple times (if you have enough energy).
- "Mark" an enemy i exactly once: you earn no points, but you gain back enemyEnergies[i] energy.
You can mark each enemy at most once. The goal is to maximize your score (total points) by defeating and marking enemies in any order, possibly repeatedly defeating/marking as energy allows.

### Examples  

**Example 1:**  
Input: `enemyEnergies = [3,2,2]`, `currentEnergy = 2`  
Output: `3`  
*Explanation:  
- Defeat enemy 1: points = 1, currentEnergy = 0  
- Mark enemy 0 (gain 3): currentEnergy = 3  
- Defeat enemy 2: points = 2, currentEnergy = 1  
- Mark enemy 2 (gain 2): currentEnergy = 3  
- Defeat enemy 1: points = 3, currentEnergy = 1  
Total points: 3 (all others moves would not increase points further; marking restores energy)*

**Example 2:**  
Input: `enemyEnergies = [2]`, `currentEnergy = 10`  
Output: `5`  
*Explanation:  
- Defeat enemy 0 five times (2 × 5 = 10).  
- No benefit to marking.*

**Example 3:**  
Input: `enemyEnergies = [5,6]`, `currentEnergy = 4`  
Output: `0`  
*Explanation:  
- Not enough energy to defeat or mark any enemy, so score is 0.*

### Thought Process (as if you’re the interviewee)  
First, notice that for each enemy you can defeat them as many times as your energy allows, spending exactly their energy cost per point; marking also gives you back their energy, but can only be done once per enemy.  
**Brute-force:** Try all sequences of marks and defeats, but this has exponential complexity because of all possible choices.
**Key observations:**  
- You get energy from marking exactly once per enemy; after marking is used, that enemy can't be marked again.
- The *smallest* enemyEnergies[i] is the most efficient for gaining points by repeated defeats.
- Every time you run out of enough energy to defeat, you can use marks to regain an enemy's energy and try continuing.
**Greedy strategy:** Always defeat the smallest-cost enemy as much as possible, mark "energy-restore" enemies only when you need to boost energy to continue defeating.
- Since the number of enemies and initial energy are both ≤10⁹ and ≤10, it's feasible to simulate or calculate based on the minimum energy cost.
- The optimal solution: You can earn (currentEnergy + sum(enemyEnergies) - min(enemyEnergies)) // min(enemyEnergies), assuming you mark all other enemies at some point to refill your energy.

### Corner cases to consider  
- No energy to defeat or mark (currentEnergy < all enemyEnergies)  
- All enemies have same energy cost  
- Only one enemy in the array  
- Large initial energy, much larger than enemies’ costs  
- Very high cost enemies

### Solution

```python
def maximumPoints(enemyEnergies, currentEnergy):
    # Step 1: Find the minimum energy cost among all enemies
    min_energy = min(enemyEnergies)
    # Step 2: If we cannot defeat any enemy even once, return 0
    if currentEnergy < min_energy:
        return 0
    # Step 3: The sum of all enemy energies, we can gain each by marking once
    total_energy = sum(enemyEnergies)
    # Step 4: The optimal number of points is as follows:
    # Each point needs min_energy,
    # We can use marks to regain at most (sum - min_energy)
    max_points = (currentEnergy + total_energy - min_energy) // min_energy
    return max_points
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — one pass to find min, one pass for sum, n = number of enemies.
- **Space Complexity:** O(1) — uses only a constant amount of extra storage, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of marks you can use is limited to m < n?  
  *Hint: Now you choose which enemies to mark greedily for the most energy.*

- If marking also gave a point, how would it change the logic?  
  *Hint: Consider combining the marking and defeat operations strategically.*

- What if enemyEnergies could change (increase) after each defeat?  
  *Hint: The optimal sequence could require priority queues or dynamic programming.*

### Summary
This problem is a **greedy simulation** with careful resource management. The main trick is to focus on always defeating the cheapest-cost enemy to maximize point gain, while using marks only for energy boosts when necessary. This kind of pattern occurs in **resource allocation DP, greedy coin change, and scheduling with refills**. The implemented greedy + math solution generalizes to similar problems with limited operations and one-shot restoration effects.