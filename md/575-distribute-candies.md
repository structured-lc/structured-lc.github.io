### Leetcode 575 (Easy): Distribute Candies [Practice](https://leetcode.com/problems/distribute-candies)

### Description  
Alice has a collection of candies, each represented by an integer that indicates its type. She needs to eat only half of the candies to limit her sugar intake, but she wants to maximize the number of unique types she gets to eat. Given an array where each entry is the type of a particular candy, what is the maximum number of different candy types Alice can have if she must eat exactly half of all candies?

### Examples  

**Example 1:**  
Input: `[1,1,2,2,3,3]`  
Output: `3`  
*Explanation: Alice has 6 candies and can eat exactly 3. There are 3 unique types (1, 2, 3), so she can consume all three types by taking one of each.*

**Example 2:**  
Input: `[1,1,2,3]`  
Output: `2`  
*Explanation: Alice has 4 candies and can eat exactly 2. There are 3 unique types, but she can eat at most 2 different types as she only gets 2 candies in total.*

**Example 3:**  
Input: `[6,6,6,6]`  
Output: `1`  
*Explanation: Alice has 4 candies, all of type 6. She can eat 2 candies, but they are all the same type, so only 1 unique type is possible.*

### Thought Process (as if you’re the interviewee)  
The problem asks to maximize the unique candy types Alice can eat, with the restriction that she eats exactly half the candies.  
**Brute-force idea:** Try all possible combinations of candies Alice can eat (of size n/2), count the number of unique types in each, and keep track of the maximum.  
- However, this is too slow, as the number of combinations is very large for typical array sizes.

**Optimization:**  
- Since Alice can eat only half of the candies, the maximum number of unique types she can get is either:
    - the number of unique types present, or
    - the number of candies she can eat (n/2, using integer division, or equivalently ⌊n/2⌋ if n is odd).
- So, the optimal answer is the minimum of those two values.
- To count unique types, use a set structure (since sets automatically filter for uniqueness).
- Efficient and succinct logic: return min(len(candies) // 2, len(set(candies)))

### Corner cases to consider  
- Only 1 candy: Should return 1.
- All candies same type: Should return 1, even if she can eat more than 1 candy.
- All candies unique: She can only eat n//2 different types, even if there are more types than that.
- Empty array: Should return 0.
- Candies array has negative integers (if not restricted in input spec): still works.
- Large inputs: Solution must run efficiently, ideally linear time.

### Solution

```python
def distributeCandies(candies):
    # Number of unique candy types
    unique_types_count = 0
    seen = set()
    for candy in candies:
        if candy not in seen:
            seen.add(candy)
            unique_types_count += 1
    
    # Max candies Alice can eat
    n = len(candies)
    max_allowable = n // 2
    
    # Return minimum of unique types and max she can eat
    return min(unique_types_count, max_allowable)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of candies.  
    - One pass to build the set of unique types.
    - min() and len() are O(1).
- **Space Complexity:** O(k), where k is the number of unique candy types (to store in the set).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if Alice could eat any number (not necessarily half) of candies?  
  *Hint: Generalize to a variable limit on the number of candies she can eat.*

- What if the candies were distributed among multiple people, and you needed to maximize the total number of unique types among everyone?  
  *Hint: Think about set union operations and fair distribution among people.*

- Can this approach be extended to a distributed system where candies are streamed in real-time?  
  *Hint: Consider ways to estimate unique types efficiently (e.g., using hash-based sketches).*

### Summary
This problem is a classic **set/unique counting** scenario paired with a simple **capacity constraint** (can eat ⌊n/2⌋). The optimal solution uses a set to count unique items, then returns the minimum of this count and the limit allowed. This is a common **hashing and counting** pattern, applicable to any scenario where you must maximize diversity under a quantity constraint.