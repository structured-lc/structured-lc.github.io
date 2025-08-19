### Leetcode 981 (Medium): Time Based Key-Value Store [Practice](https://leetcode.com/problems/time-based-key-value-store)

### Description  
Design a class that acts as a **time-based key-value store**.  
For each key, you can store multiple values with different timestamps.  
- The `set(key, value, timestamp)` method should set the value for the key at a specific timestamp.
- The `get(key, timestamp)` method should return the value for the key with the **largest timestamp ≤ the given timestamp**.  
- If no such timestamp exists, return an empty string.  
Think of it as a versioned dictionary where you can query older versions by timestamp.

### Examples  

**Example 1:**  
Input:  
```
["TimeMap","set","get","get","set","get","get"]
[[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]
```  
Output:  
```
[null,null,"bar","bar",null,"bar2","bar2"]
```  
Explanation:  
- `set("foo","bar",1)` stores "bar" at timestamp 1.
- `get("foo",1)` returns "bar" (exact match).
- `get("foo",3)` finds that the latest value before or at time=3 is at t=1, so returns "bar".
- `set("foo","bar2",4)` stores "bar2" at timestamp 4.
- `get("foo",4)` returns "bar2" (exact match).
- `get("foo",5)` finds timestamp=4 is the latest ≤ 5, so returns "bar2".

**Example 2:**  
Input:  
```
["TimeMap","set","set","get","get"]
[[],["foo","bar",5],["foo","baz",10],["foo",6],["foo",100]]
```  
Output:  
```
[null,null,null,"bar","baz"]
```  
Explanation:  
- `set("foo","bar",5)`
- `set("foo","baz",10)`
- `get("foo",6)` finds "bar" at t=5 as the latest ≤ 6.
- `get("foo",100)` finds "baz" at t=10 as the latest ≤ 100.

**Example 3:**  
Input:  
```
["TimeMap","set","get"]
[[],["x","y",5],["x",2]]
```  
Output:  
```
[null,null,""]
```  
Explanation:  
- `set("x","y",5)`
- `get("x",2)` finds no value set at or before t=2, returns "".

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** For each `set`, append `(timestamp, value)` to a list for each key. For `get`, scan backwards through the list for that key until finding the latest timestamp ≤ given one.  
    - This is O(n) per `get`, which can be slow if many values stored per key.
- **Optimized approach:**  
    - **Maintain for each key:** a sorted list of (timestamp, value) pairs.
    - When calling `get(key, timestamp)`, since timestamps are added in order, perform **binary search** over the list to find the greatest timestamp ≤ given timestamp.
    - This reduces the `get` to O(log n) per key.
- **Data Structure Design:**  
    - Use a hash map: `dict[str, List[Tuple[int, str]]]`.
    - Binary search over the timestamps for efficient queries.
    - All timestamps for a key are strictly increasing in the input, so can append; no need to sort.

### Corner cases to consider  
- Querying a key before any value was ever set (should return "").
- Querying a key for an exact timestamp (should return value).
- Querying a key for a timestamp before the first set (should return "").
- Multiple sets for the same key at increasing timestamps.
- Empty key or value strings.
- Multiple keys, independent histories.
- Large number of sets/gets, performance.

### Solution

```python
class TimeMap:

    def __init__(self):
        # Store: key -> list of (timestamp, value) pairs, sorted by timestamp
        self.store = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        # Append (timestamp, value) for the key
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        # Return value for key with largest timestamp ≤ given timestamp
        if key not in self.store:
            return ""
        pairs = self.store[key]
        # Binary search to find rightmost timestamp ≤ target
        left, right = 0, len(pairs) - 1
        res = ""
        while left <= right:
            mid = (left + right) // 2
            ts, val = pairs[mid]
            if ts <= timestamp:
                res = val
                left = mid + 1
            else:
                right = mid - 1
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**
    - `set`: O(1) per call (append to list).
    - `get`: O(log n), where n is the number of pairs for the key (binary search over timestamps).
    - Constructor: O(1).
- **Space Complexity:**
    - O(total number of set calls), i.e. O(N), as we store every value+timestamp pair.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `set` can be called with timestamps not in increasing order?
  *Hint: Would the sorted property still hold? How would your binary search work?*
  
- How to optimize for memory usage if values are large and rarely needed?
  *Hint: Can you lazy-load, compress values, or implement value eviction?*

- How would your solution differ if the values must expire after a period?
  *Hint: Can you efficiently discard old pairs, or would lookups need to check expiration?*

### Summary
We built a classic **dictionary with history/tracking**, using hash map + binary search.  
This method is highly efficient and common whenever you need "get previous state/version" queries.  
The pattern applies to any **versioned data**, such as:
- Price histories
- Document versioning
- Undo stacks  
Core pattern: Use list to store timestamped values for each key (since they are monotonic), then binary search to get efficient queries for largest value ≤ timestamp.

### Tags
Hash Table(#hash-table), String(#string), Binary Search(#binary-search), Design(#design)

### Similar Problems
- Stock Price Fluctuation (stock-price-fluctuation) (Medium)