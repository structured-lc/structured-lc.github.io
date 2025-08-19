### Leetcode 2126 (Medium): Destroying Asteroids [Practice](https://leetcode.com/problems/destroying-asteroids)

### Description  
Given a planet with initial **mass** and an array of **asteroids**, each asteroid with its own mass, the planet can collide with asteroids in **any order**. If the planet's mass is **greater than or equal to** an asteroid's mass, it **destroys** the asteroid and its mass increases by the asteroid's mass. Otherwise, the planet is destroyed and cannot destroy that asteroid or any remaining asteroids.  
Return **true** if the planet can destroy **all** asteroids in some order; else return **false**.

### Examples  

**Example 1:**  
Input: `mass = 10, asteroids = [3,9,19,5,21]`  
Output: `True`  
*Explanation: Sort asteroids: [3,5,9,19,21].  
- Planet (10) destroys 3 → New mass = 13  
- Destroys 5 → New mass = 18  
- Destroys 9 → New mass = 27  
- Destroys 19 → New mass = 46  
- Destroys 21 → New mass = 67  
All asteroids are destroyed.*

**Example 2:**  
Input: `mass = 5, asteroids = [4,9,23,4]`  
Output: `False`  
*Explanation: Sort asteroids: [4,4,9,23].  
- Planet (5) destroys 4 → New mass = 9  
- Destroys 4 → New mass = 13  
- Next asteroid (9) is less than current mass, planet destroys it → New mass = 22  
- Next asteroid (23) is **greater** than current mass (22).  
Cannot destroy all asteroids.*

**Example 3:**  
Input: `mass = 1, asteroids = [1,2,3]`  
Output: `True`  
*Explanation:  
- Destroy 1 → mass=2  
- Destroy 2 → mass=4  
- Destroy 3 → mass=7  
All destroyed.*

### Thought Process (as if you’re the interviewee)  

Start by observing:
- The planet can choose **any order** to collide with asteroids.
- To maximize survival, always **consume the smallest available asteroid** first to maximize mass gain and increase chances of absorbing larger asteroids later.

**Brute-force idea:**  
Try all permutations of asteroid orders and simulate collisions for each one.  
- Time: O(n!), infeasible for any realistic input size.

**Optimization (Greedy):**  
- Sort asteroids by ascending mass.  
- For each asteroid:
  - If planet mass ≥ asteroid mass, absorb it, grow mass.
  - If not, cannot absorb → return False.
- This is correct because any asteroid the planet currently cannot absorb, it would also never be able to absorb later (since all subsequent asteroids are at least as large).

**Trade-offs:**  
- Sorting is O(n log n), which is efficient and acceptable.
- No need for complex data structures since the greedy ordering guarantees correctness.

### Corner cases to consider  
- Empty asteroids array (should return True).
- Initial mass very large compared to all asteroids.
- Initial mass smaller than all asteroids (should return False).
- Asteroids with duplicate masses.
- Single-element asteroids list.
- Asteroids with zero mass (problem constraint? If allowed).

### Solution

```python
def asteroidsDestroyed(mass, asteroids):
    # Sort the asteroids for greedy gathering from smallest mass
    asteroids.sort()
    
    # Use a variable that can hold large values
    mass = int(mass)
    
    for asteroid in asteroids:
        # If current mass is enough, absorb the asteroid
        if mass >= asteroid:
            mass += asteroid
        else:
            # If not enough mass, fail immediately
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = number of asteroids (because of sorting; the for-loop is O(n)).
- **Space Complexity:** O(1) extra space (apart from input and sort, which can be done in-place).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the asteroids array is extremely large (memory-constrained)?
  *Hint: Can you process data in a streaming manner?*

- How would you handle integer overflow for very large mass values?
  *Hint: Use language features like arbitrary-precision integers.*

- If the "order doesn't matter" condition is removed, what would change in your greedy approach?
  *Hint: Is there still a possible solution other than brute-force?*

### Summary
This is a classic **greedy** pattern question: always make the locally optimal (smallest first) choice to ensure a global solution. The key is to sort inputs for ordered processing, a common approach in interval problems, resource gathering, or minimizing/maximizing capacity. This pattern appears often in variations of scheduling, merging, and accumulation-style interview questions.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Asteroid Collision(asteroid-collision) (Medium)