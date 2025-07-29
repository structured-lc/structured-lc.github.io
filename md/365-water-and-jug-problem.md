### Leetcode 365 (Medium): Water and Jug Problem [Practice](https://leetcode.com/problems/water-and-jug-problem)

### Description  
You are given two jugs with capacities x and y liters, and an unlimited water supply. You can:
- **Fill** either jug completely.
- **Empty** either jug.
- **Pour** water from one jug to the other, stopping whenever either the source runs dry or the other is full.

Your task is: Given integers jug1Capacity, jug2Capacity, and targetCapacity, determine if you can measure exactly targetCapacity liters using those operations. Imagine you have to explain to an interviewer: can you use these basic operations to end up with exactly z liters in either jug, or is it impossible by any sequence of moves?

### Examples  

**Example 1:**  
Input: `jug1Capacity = 3, jug2Capacity = 5, targetCapacity = 4`  
Output: `True`  
*Explanation: You can fill jug2 (5), pour to jug1 (leaving 2 in jug2), empty jug1, pour remaining 2 from jug2 to jug1, fill jug2, pour from jug2 to jug1 (jug1 is full with 3, jug2 has 4-3=1 left), empty jug1, pour 1 from jug2 to jug1, fill jug2, pour jug2 into jug1 until jug1 becomes full (now jug1 has 3, jug2 has 4). The process can be continued to reach exactly 4 liters.*

**Example 2:**  
Input: `jug1Capacity = 2, jug2Capacity = 6, targetCapacity = 5`  
Output: `False`  
*Explanation: The GCD of 2 and 6 is 2. You can only measure multiples of 2 liters. 5 cannot be achieved with these operations.*

**Example 3:**  
Input: `jug1Capacity = 1, jug2Capacity = 2, targetCapacity = 3`  
Output: `True`  
*Explanation: Fill both jugs to maximum = 1 + 2 = 3. So, exactly 3 liters can be measured.*

### Thought Process (as if you’re the interviewee)  

Let’s start by thinking about brute-force: What if we tried every possible sequence of moves—fill, empty, pour—for both jugs, maintaining all possible water combinations?  
- This gives us a search problem: each (x, y) water state is a node, and each operation is an edge to another state. We could use BFS or DFS to explore states until either we reach the target, or run out of states.
- However, this can be very inefficient as the combinations grow quadratically with the capacities.

But, reviewing the underlying math, this is a classic Diophantine equation problem—when can we express targetCapacity as a combination of the two jug sizes?  
- **Bézout's identity**: For two integers a, b, any measure that can be formed is a multiple of gcd(a, b). So, targetCapacity must be a multiple of gcd(jug1Capacity, jug2Capacity).
- Also, targetCapacity must not exceed the total capacity (jug1Capacity + jug2Capacity).

So, the main optimized approach is:
- If targetCapacity > jug1Capacity + jug2Capacity → impossible.
- If targetCapacity is a multiple of gcd(jug1Capacity, jug2Capacity), it's possible.

This method is efficient (O(log(min(jug1, jug2))) because GCD is fast to compute), and perfectly fits both logic and coding interview goals.

### Corner cases to consider  
- Either jug has zero capacity (x or y == 0).
- targetCapacity == 0 (always possible).
- targetCapacity is exactly equal to jug1Capacity, jug2Capacity, or their sum.
- targetCapacity > jug1Capacity + jug2Capacity (impossible).
- Extremely large or extreme min/max integer values.
- Negative capacity or target (should be disallowed/input validation, but worth mentioning).

### Solution

```python
def canMeasureWater(jug1Capacity: int, jug2Capacity: int, targetCapacity: int) -> bool:
    # If total capacity of both jugs is less than target, impossible
    if jug1Capacity + jug2Capacity < targetCapacity:
        return False
    
    # If either jug has zero capacity
    if jug1Capacity == 0 or jug2Capacity == 0:
        # Only possible if target is 0 or equals the other jug's capacity
        return targetCapacity == 0 or jug1Capacity + jug2Capacity == targetCapacity
    
    # Helper function to compute GCD
    def gcd(a: int, b: int) -> int:
        while b != 0:
            a, b = b, a % b
        return a
    
    # Use Bézout's identity: can only form multiples of GCD
    return targetCapacity % gcd(jug1Capacity, jug2Capacity) == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(min(x, y))); computing GCD efficiently with Euclidean Algorithm.
- **Space Complexity:** O(1); only a few integer variables, no recursion stack or queue required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only fill/empty both jugs at the same time?  
  *Hint: Try to define the allowed states and transitions more strictly, and see how this reduces possibilities.*

- How would you extend this to three or more jugs?  
  *Hint: Generalize the GCD property to more numbers, and consider set reachability.*

- Can you output the actual sequence of operations to reach targetCapacity?  
  *Hint: BFS or DFS state search with parent tracing to reconstruct the step-by-step solution.*

### Summary
This problem highlights **number theory meets BFS/state search**. The mathematical solution—checking divisibility by the GCD—is a classic trick for measuring problems, and offers a massively efficient alternative to brute-force. This pattern is common whenever you’re tasked to reach some target using additive combinations of two or more fixed measurements, like weighing-puzzle variants and classic pouring-jug puzzles.