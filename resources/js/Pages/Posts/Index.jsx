import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Index({ auth, posts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        body: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("posts.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head>
                <title>Posts</title>
                <meta name="description" content="Posts Index" />
            </Head>

            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <form className="mb-8" onSubmit={submit}>
                            <label className="sr-only">Title</label>
                            <input
                                name="title"
                                id="title"
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mb-3"
                                placeholder="Title"
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            {errors.title}
                            <label className="sr-only">Body</label>
                            <textarea
                                name="body"
                                id="body"
                                rows="5"
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mb-3"
                                placeholder="Body"
                                onChange={(e) =>
                                    setData("body", e.target.value)
                                }
                            ></textarea>
                            {errors.body}
                            <button
                                type="submit"
                                className="bg-gray-700 px-4 py-2 rounded-md text-white font-medium"
                            >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {posts.data.map((post) => {
                        return (
                            <div
                                className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5 mb-3"
                                key={post.id}
                            >
                                <div className="mb-4">
                                    <h3 className="font-bold">{post.title}</h3>
                                    <p className="text-xs">
                                        by {post.user.name}
                                    </p>
                                    <p className="mt-1">{post.body}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
