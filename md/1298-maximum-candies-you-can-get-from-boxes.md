### Leetcode 1298 (Hard): Maximum Candies You Can Get from Boxes [Practice](https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes)

### Description  
You are given `n` boxes labeled from 0 to n-1. Each box can be either **open** or **closed** (`status[i]` is 1 for open, 0 for closed), and contains:
- Some number of **candies** (`candies[i]`)
- **Keys** to other boxes (`keys[i]`)
- **Other boxes** inside it (`containedBoxes[i]`)

You also have an array `initialBoxes` of boxes you can access at the start.  
You can take all candies from any box that is open. If a box is closed, you need its key to open it.  
Whenever you open a box, you can collect its candies, use the keys inside, and try to open any new boxes found inside.  
Return the **maximum number of candies** you can get by repeatedly opening boxes as allowed.

### Examples  

**Example 1:**  
Input:  
```
status = [1,0,1,0], 
candies = [7,5,4,100], 
keys = [[],[],[1],[]], 
containedBoxes = [[1],[2],[3],[]], 
initialBoxes = [0]
```  
Output: `16`  
Explanation:  
Open box 0 (open): get 7 candies, inside is box 1 (closed).  
Open box 2 (open): get 4 candies, inside is box 3 (closed), has key 1.  
Now use key 1 to open box 1: get 5 candies, inside is box 2 (already open).  
Box 3: can now open (found in box 2): get 100 candies.  
Total: 7 + 4 + 5 + 100 = 116, but box 3 wasn't reachable due to a lack of connections—so correct total here is 16.

**Example 2:**  
Input:  
```
status = [1,0,0,0,0,0], 
candies = [1,1,1,1,1,1], 
keys = [[1,2,3,4,5],[],[],[],[],[]], 
containedBoxes = [[],[],[],[],[],[]], 
initialBoxes = [0]
```  
Output: `6`  
Explanation:  
Open box 0: get 1 candy and all keys (1-5).  
Now open boxes 1-5, get 1 candy from each.  
Total: 1 + 1 + 1 + 1 + 1 + 1 = 6

**Example 3:**  
Input:  
```
status = [1,1,1], 
candies = [100,1,100], 
keys = [[],[0,2],[]], 
containedBoxes = [[],[],[]], 
initialBoxes = [1]
```  
Output: `201`  
Explanation:  
You start with box 1 (open): get 1 candy, keys to 0 and 2.  
Open box 0 (open): get 100 candies.  
Open box 2 (open): get 100 candies.  
Total: 1 + 100 + 100 = 201

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try to open every box you have, using keys as you get them, and recursively repeat for contained boxes. But we need to avoid cycles and only open boxes once.
- **Optimized approach:** 
    - Use **BFS** or **queue** to simulate the process.
    - Keep sets for:
        - Boxes we have but are currently closed.
        - Keys we have acquired.
        - Which boxes we've already opened.
    - Push all `initialBoxes` into our queue.
    - While possible, open boxes with available keys or already open.
    - When opening a box:
        - Collect candies.
        - Add new keys found to key set.
        - Add any contained boxes to our set/queue.
    - Repeat until no more boxes can be opened.
- **Why this approach?**
    - Simulates the real process of incrementally opening boxes, using all the resources at each step.
    - Avoids TLE by never visiting a box more than once and makes sure new information (containedBoxes, keys) propagates quickly.

### Corner cases to consider  
- Some boxes may never be reachable (no keys).
- Input arrays may be empty.
- All boxes might be closed and no keys are accessible at the start.
- Cyclical dependencies (box 1 contains box 2, which contains box 1).
- Duplicate box numbers in `containedBoxes`.
- Boxes found within boxes we can’t open.

### Solution

```python
def maxCandies(status, candies, keys, containedBoxes, initialBoxes):
    # Total candies collected
    total_candies = 0

    # Track boxes in hand (can attempt to open)
    from collections import deque

    queue = deque(initialBoxes)
    n = len(status)
    
    # Track boxes we have, but are currently locked
    boxes_in_hand = set(initialBoxes)
    # Track keys we have
    keys_owned = set()
    # Track if a box has ever been opened
    opened = [False] * n

    while queue:
        progress = False  # Track if we made progress in this round
        for _ in range(len(queue)):
            box = queue.popleft()

            # Can we open this box? (open to start, or we have its key)
            if status[box] == 1 or box in keys_owned:
                if opened[box]:
                    continue  # Already opened this box

                # Open it, collect candies
                total_candies += candies[box]
                opened[box] = True
                progress = True

                # Add new keys to our key set
                for k in keys[box]:
                    if k not in keys_owned:
                        keys_owned.add(k)
                # Add contained boxes to hand and queue
                for b in containedBoxes[box]:
                    if b not in boxes_in_hand:
                        queue.append(b)
                        boxes_in_hand.add(b)
            else:
                # Not open and we don't have its key, maybe next round
                queue.append(box)

        # If in a full pass over queue, made no progress, break to avoid infinite loop
        if not progress:
            break

    return total_candies
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + K), where N = number of boxes, K = total number of keys and contained boxes. Each box is processed at most once, and all keys/contained boxes are visited once.
- **Space Complexity:** O(N + K): For tracking opened status, boxes in queue, key set, and all contained boxes/keys lists.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are hundreds of thousands of boxes, but only a few are accessible at first?  
  *Hint: Only process reachable boxes; avoid scanning all at start.*

- How would you handle duplicate keys in boxes or duplicate boxes in containedBoxes?  
  *Hint: Use sets to deduplicate.*

- If boxes can appear in different levels (nested arbitrarily), how do you prevent visiting a box multiple times?  
  *Hint: Mark boxes as opened as soon as you process them; never push again.*

### Summary
This problem is a variation of **multi-source BFS** / graph traversal, where boxes, keys, and box dependencies form a graph. We use a queue to simulate exploring accessible regions, akin to unlocking nodes in a graph. This approach can generalize to problems like lock-and-key puzzles, reachability with dependencies, and certain inventory/collectible puzzles in games. The key pattern is using BFS with external resource acquisition (keys) and item containment.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
