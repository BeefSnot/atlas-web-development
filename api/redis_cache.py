import redis
import uuid

class RedisCache:
    def __init__(self, socket_path, prefix=None):
        self.client = redis.Redis(unix_socket_path=socket_path)
        self.prefix = prefix or str(uuid.uuid4())

    def _prefixed_key(self, key):
        return f"{self.prefix}:{key}"

    def set(self, key, value, ex=None):
        """Set a value in the cache with an optional expiration time."""
        return self.client.set(self._prefixed_key(key), value, ex=ex)

    def get(self, key):
        """Get a value from the cache."""
        return self.client.get(self._prefixed_key(key))

    def delete(self, key):
        """Delete a value from the cache."""
        return self.client.delete(self._prefixed_key(key))

    def exists(self, key):
        """Check if a key exists in the cache."""
        return self.client.exists(self._prefixed_key(key))

    def incr(self, key, amount=1):
        """Increment a value in the cache."""
        return self.client.incr(self._prefixed_key(key), amount)

    def decr(self, key, amount=1):
        """Decrement a value in the cache."""
        return self.client.decr(self._prefixed_key(key), amount)

    def expire(self, key, time):
        """Set an expiration time on a key."""
        return self.client.expire(self._prefixed_key(key), time)

    def ttl(self, key):
        """Get the time-to-live of a key."""
        return self.client.ttl(self._prefixed_key(key))

    def flushdb(self):
        """Flush the database."""
        return self.client.flushdb()

# Usage example
if __name__ == "__main__":
    cache = RedisCache("/home/dynastyhosting/.redis/redis.sock")
    
    # Set a value
    cache.set("example_key", "example_value", ex=10)
    
    # Get a value
    value = cache.get("example_key")
    print(f"Retrieved value: {value.decode('utf-8')}" if value else "Key not found")
    
    # Check if a key exists
    print(f"Key exists: {cache.exists('example_key')}")
    
    # Increment a value
    cache.set("counter", 0)
    cache.incr("counter")
    print(f"Counter value: {cache.get('counter').decode('utf-8')}")
    
    # Decrement a value
    cache.decr("counter")
    print(f"Counter value: {cache.get('counter').decode('utf-8')}")
    
    # Set an expiration time
    cache.expire("example_key", 5)
    print(f"TTL for example_key: {cache.ttl('example_key')}")
    
    # Flush the database
    cache.flushdb()
    print("Database flushed")